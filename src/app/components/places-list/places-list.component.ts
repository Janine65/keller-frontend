import { Component, OnInit } from '@angular/core';
import { DropdownClass, ReturnStruct } from '@models/generel';
import { Place, PlaceType } from '@models/places';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { map, zip } from 'rxjs';

@Component({
  selector: 'keller-frontend-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css'],
  providers: []
})
export class PlacesListComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    for (let index = 0; index < 4; index++) {
      const element: DropdownClass = new DropdownClass();
      element.label = PlaceType[index];
      element.value = PlaceType[index];
      this.lPlaceType.push(element);
    }
  }
  lPlaces: Place[] = [];
  lUsers: User[] = [];
  clonedPlaces: { [s: number]: Place } = {};
  isLoading = true;
  lPlaceType: DropdownClass[] = [];

  ngOnInit(): void {
    zip(this.backendService.getPlaces(), this.backendService.getUsers())
      .pipe(
        map(([placesRet, usersRet]) => {
          this.lPlaces = placesRet.data;
          this.lUsers = usersRet.data! as User[];
          this.lPlaces.forEach((place) => {
            place.createdAt_date = new Date(place.createdAt);
            place.updatedAt_date = new Date(place.updatedAt);
            if (place.userid != undefined) {
              const iUser = (usersRet.data! as User[]).findIndex(
                (user) => user.id == place.userid
              );
              if (iUser >= 0)
                place.user = (usersRet.data! as User[])[iUser].name;
            }
          });
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  onRowEditInit(place: Place) {
    this.clonedPlaces[place.id!] = {...place}

  }

  onRowNew() {
    this.lPlaces.unshift(new Place());
  }

  onRowEditSave(place: Place, row: number) {
    if (place.name != '' && place.type != PlaceType['']) {
      place.user = this.authService.userValue.name;
      place.userid = this.authService.userValue.id;

      if (place.id == undefined || place.id == 0) {
        place.id = undefined;
        this.backendService.insertPlace(place).subscribe({
          next: (placeRet: ReturnStruct) => {
            delete this.clonedPlaces[0];
            this.lPlaces[row] = placeRet.data as Place;
            this.lPlaces[row].createdAt_date = new Date(this.lPlaces[row].createdAt);
            this.lPlaces[row].updatedAt_date = new Date(this.lPlaces[row].updatedAt);
            this.lPlaces[row].user = this.authService.userValue.name;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Place is updated' });
          }
        })  
      } else {
        this.backendService.updatePlace(place).subscribe({
          next: (placeRet: ReturnStruct) => {
            delete this.clonedPlaces[place.id!];
            this.lPlaces[row] = placeRet.data as Place;
            this.lPlaces[row].createdAt_date = new Date(this.lPlaces[row].createdAt);
            this.lPlaces[row].updatedAt_date = new Date(this.lPlaces[row].updatedAt);
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
}
