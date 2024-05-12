import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaceTypeComponent } from '@components/place-type/place-type.component';
import { DropdownClass, ReturnStruct } from '@models/generel';
import { Place, Placetype } from '@models/places';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, zip } from 'rxjs';

@Component({
  selector: 'keller-frontend-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css'],
  providers: [DialogService]
})
export class PlacesListComponent implements OnInit, OnDestroy {
  constructor(
    private backendService: BackendService,
    private messageService: MessageService,
    private authService: AuthService,
    private dialogService: DialogService) {
  }
  lPlaces: Place[] = [];
  lUsers: User[] = [];
  clonedPlaces: { [s: number]: Place } = {};
  isLoading = true;
  lPlaceType: DropdownClass[] = [];

  ref: DynamicDialogRef | undefined;

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  ngOnInit(): void {
    zip(this.backendService.getPlaces(), this.backendService.getUsers(), this.backendService.getPlacetypes())
      .pipe(
        map(([placesRet, usersRet, placetypeRet]) => {
          this.lPlaces = placesRet.data as Place[];
          this.lUsers = usersRet.data! as User[];
          this.lPlaces.forEach((place) => {
            place.placetype = (placetypeRet.data as Placetype[]).find(placetype => placetype.id == place.placetypeid)?.name!
            place.icon = (placetypeRet.data as Placetype[]).find(placetype => placetype.id == place.placetypeid)?.icon!
            if (place.userid != undefined) {
              const iUser = (usersRet.data! as User[]).findIndex(
                (user) => user.id == place.userid
              );
              if (iUser >= 0)
                place.user = (usersRet.data! as User[])[iUser].name;
            }
          });
          (placetypeRet.data as Placetype[]).forEach(placetype => {
            const drop = new DropdownClass();
            drop.label = placetype.name;
            drop.value = placetype.id;
            drop.icon = placetype.icon!;
            this.lPlaceType.push(drop);
          })
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  onRowEditInit(place: Place) {
    this.clonedPlaces[place.id!] = { ...place }

  }

  onRowNew() {
    const newPlace = new Place();
    newPlace.id = 0;
    this.lPlaces.unshift(newPlace);
    this.onRowEditInit(this.lPlaces[0])
  }

  onRowEditSave(place: Place, row: number) {
    if (place.name != '' && place.placetypeid! > 0) {
      place.user = this.authService.userValue.name;
      place.userid = this.authService.userValue.id;
      if (place.id == undefined || place.id == 0) {
        place.id = undefined;
        this.backendService.insertPlace(place).subscribe({
          next: (placeRet: ReturnStruct) => {
            delete this.clonedPlaces[0];
            this.lPlaces[row] = placeRet.data as Place;
            this.lPlaces[row].placetype = this.lPlaceType.find(placetype => placetype.value == this.lPlaces[row].placetypeid)?.label!
            this.lPlaces[row].icon = this.lPlaceType.find(placetype => placetype.value == this.lPlaces[row].placetypeid)?.icon!
            this.lPlaces[row].user = this.authService.userValue.name;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Place is updated' });
          }
        })
      } else {
        this.backendService.updatePlace(place).subscribe({
          next: (placeRet: ReturnStruct) => {
            delete this.clonedPlaces[place.id!];
            this.lPlaces[row] = placeRet.data as Place;
            this.lPlaces[row].placetype = this.lPlaceType.find(placetype => placetype.value == this.lPlaces[row].placetypeid)?.label!
            this.lPlaces[row].icon = this.lPlaceType.find(placetype => placetype.value == this.lPlaces[row].placetypeid)?.icon!
            this.lPlaces[row].user = this.authService.userValue.name;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Place is updated' });
          }
        })
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid name or type' });
    }

  }

  onRowEditCancel(place: Place, row: number) {
    this.lPlaces[row] = this.clonedPlaces[place.id!];
    delete this.clonedPlaces[place.id!];
    if (this.lPlaces[row].id == 0)
      delete this.lPlaces[row]
  }

  onRowDelete(place: Place, row: number) {
    this.backendService.deletePlace(place).subscribe({
      next: () => {
        delete this.clonedPlaces[place.id!];
        delete this.lPlaces[row];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Place is deleted' });
      }
    })

  }
  showPlacetype() {
    this.ref = this.dialogService.open(PlaceTypeComponent, {
      header: 'Placetypes',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      closable: false,
      resizable: true,
      modal: true,
      closeOnEscape: true,
      draggable: true
    });

    this.ref.onClose.subscribe((lPlacetypeReturn: Placetype[]) => {
      if (lPlacetypeReturn) {
        this.isLoading = true;
        this.lPlaceType = []
        lPlacetypeReturn.forEach(placetype => {
          const drop = new DropdownClass();
          drop.label = placetype.name;
          drop.value = placetype.id;
          drop.icon = placetype.icon;
          this.lPlaceType.push(drop);
        })
        this.lPlaces.forEach(place => {
          place.placetype = this.lPlaceType.find(type => type.value == place.placetypeid)?.label!
          place.icon = this.lPlaceType.find(placetype => placetype.value == place.placetypeid)?.icon!
        })
        this.isLoading = false;
      }
    });
  }
}
