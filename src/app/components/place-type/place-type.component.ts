import { Component, OnInit } from '@angular/core';
import { DropdownClass, ReturnStruct } from '@models/generel';
import { Placetype, Icons } from '@models/places';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, zip } from 'rxjs';

@Component({
  selector: 'keller-frontend-place-type',
  templateUrl: './place-type.component.html',
  styleUrls: ['./place-type.component.css'],
})
export class PlaceTypeComponent implements OnInit {
  lPlacetypes: Placetype[] = [];
  clonedPlacetypes: Placetype[] = [];

  isLoading = true;
  lUsers: User[] = [];
  hasChanged = false;
  lIcons: DropdownClass[] = [];
  selIcon: DropdownClass | undefined;

  constructor(
    private backendService: BackendService,
    private messageService: MessageService,
    private authService: AuthService,
    public ref: DynamicDialogRef) {
  }
  onClose(): void {
    if (this.hasChanged)
      this.ref.close(this.lPlacetypes);
    else
      this.ref.close();
  }

  ngOnInit(): void {
    this.lIcons = [];
    const drop = new DropdownClass();
    drop.icon = '0';
    drop.value = '';
    drop.label = '';

    this.lIcons.push(drop);
    Icons.forEach(element => {
      const drop = new DropdownClass();
      drop.icon = element;
      drop.value = element;
      drop.label = element;
      this.lIcons.push(drop);

    })
    zip(this.backendService.getUsers(), this.backendService.getPlacetypes())
      .pipe(
        map(([usersRet, placetypeRet]) => {
          this.lPlacetypes = placetypeRet.data as Placetype[];
          this.lUsers = usersRet.data! as User[];
          this.lPlacetypes.forEach((placetype) => {
            placetype.createdAt_date = new Date(placetype.createdAt);
            placetype.updatedAt_date = new Date(placetype.updatedAt);
            if (placetype.userid != undefined) {
              const iUser = (usersRet.data! as User[]).findIndex(
                (user) => user.id == placetype.userid
              );
              if (iUser >= 0)
                placetype.user = (usersRet.data! as User[])[iUser].name;
            }
          });
          this.isLoading = false;
        })
      )
      .subscribe();
  }


  onRowEditInit(placetype: Placetype) {
    this.clonedPlacetypes[placetype.id!] = { ...placetype }

  }

  onRowNew() {
    this.lPlacetypes.unshift(new Placetype());
  }

  onRowEditSave(placetype: Placetype, row: number) {
    if (placetype.name != '') {
      placetype.user = this.authService.userValue.name;
      placetype.userid = this.authService.userValue.id;

      if (placetype.id == undefined || placetype.id == 0) {
        placetype.id = undefined;
        this.backendService.insertPlacetype(placetype).subscribe({
          next: (placetypeRet: ReturnStruct) => {
            delete this.clonedPlacetypes[0];
            this.lPlacetypes[row] = placetypeRet.data as Placetype;
            this.lPlacetypes[row].createdAt_date = new Date(this.lPlacetypes[row].createdAt);
            this.lPlacetypes[row].updatedAt_date = new Date(this.lPlacetypes[row].updatedAt);
            this.lPlacetypes[row].user = this.authService.userValue.name;
            this.hasChanged = true;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Placetype is inserted' });
          }
        })
      } else {
        this.backendService.updatePlacetype(placetype).subscribe({
          next: (placetypeRet: ReturnStruct) => {
            delete this.clonedPlacetypes[placetype.id!];
            this.lPlacetypes[row] = placetypeRet.data as Placetype;
            this.lPlacetypes[row].createdAt_date = new Date(this.lPlacetypes[row].createdAt);
            this.lPlacetypes[row].updatedAt_date = new Date(this.lPlacetypes[row].updatedAt);
            this.lPlacetypes[row].user = this.authService.userValue.name;
            this.hasChanged = true;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Placetype is updated' });
          }
        })
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid name or type' });
    }

  }

  onRowEditCancel(placetype: Placetype, row: number) {
    this.lPlacetypes[row] = this.clonedPlacetypes[placetype.id!];
    delete this.clonedPlacetypes[placetype.id!];
    if (this.lPlacetypes[row].id == 0)
      delete this.lPlacetypes[row]
  }

  onRowDelete(placetype: Placetype, row: number) {
    this.backendService.deletePlacetype(placetype).subscribe({
      next: () => {
        delete this.clonedPlacetypes[placetype.id!];
        delete this.lPlacetypes[row];
        this.hasChanged = true;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Placetype is deleted' });
      }
    })

  }

}
