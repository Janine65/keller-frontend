import { Component, OnInit } from '@angular/core';
import { ReturnStruct } from '@models/generel';
import { Place, Subplace } from '@models/places';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { map, zip } from 'rxjs';

@Component({
  selector: 'keller-frontend-subplace-list',
  templateUrl: './subplace-list.component.html',
  styleUrls: ['./subplace-list.component.css'],
})
export class SubplaceListComponent implements OnInit {
  lSubplaces: Subplace[] = [];
  clonedSubplaces: Subplace[] = [];

  isLoading = true;
  lPlaces: Place[] = [];
  lUsers: User[] = [];

  constructor(
    private backendService: BackendService,
    private messageService: MessageService,
    private authService: AuthService) {}

    ngOnInit(): void {

    zip(this.backendService.getPlaces(), this.backendService.getSubplaces(), this.backendService.getUsers())
      .pipe(
        map(([placesRet, subplaceRet, usersRet]) => {
          this.lSubplaces = subplaceRet.data as Subplace[];
          this.lPlaces = placesRet.data! as Place[];
          this.lUsers = usersRet.data! as User[];
          this.lSubplaces.forEach((subplace) => {
            subplace.createdAt_date = new Date(subplace.createdAt);
            subplace.updatedAt_date = new Date(subplace.updatedAt);
            subplace.place = this.lPlaces.find(place => place.id == subplace.placeid)?.name!;
            if (subplace.userid != undefined) {
              const iUser = (usersRet.data! as User[]).findIndex(
                (user) => user.id == subplace.userid
              );
              if (iUser >= 0)
                subplace.user = (usersRet.data! as User[])[iUser].name;
            }
          });
          this.isLoading = false;
        })
      )
      .subscribe();
  }


  onRowEditInit(subplace: Subplace) {
    this.clonedSubplaces[subplace.id!] = { ...subplace }

  }

  onRowNew() {
    this.lSubplaces.unshift(new Subplace());
  }

  onRowEditSave(subplace: Subplace, row: number) {
    if (subplace.name != '') {
      subplace.user = this.authService.userValue.name;
      subplace.userid = this.authService.userValue.id;

      if (subplace.id == undefined || subplace.id == 0) {
        subplace.id = undefined;
        this.backendService.insertSubplace(subplace).subscribe({
          next: (subplaceRet: ReturnStruct) => {
            delete this.clonedSubplaces[0];
            this.lSubplaces[row] = subplaceRet.data as Subplace;
            this.lSubplaces[row].createdAt_date = new Date(this.lSubplaces[row].createdAt);
            this.lSubplaces[row].updatedAt_date = new Date(this.lSubplaces[row].updatedAt);
            this.lSubplaces[row].place = this.lPlaces.find(place => place.id == this.lSubplaces[row].placeid)?.name!;
            this.lSubplaces[row].user = this.authService.userValue.name;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Subplace is updated' });
          }
        })
      } else {
        this.backendService.updateSubplace(subplace).subscribe({
          next: (subplaceRet: ReturnStruct) => {
            delete this.clonedSubplaces[subplace.id!];
            this.lSubplaces[row] = subplaceRet.data as Subplace;
            this.lSubplaces[row].createdAt_date = new Date(this.lSubplaces[row].createdAt);
            this.lSubplaces[row].updatedAt_date = new Date(this.lSubplaces[row].updatedAt);
            this.lSubplaces[row].user = this.authService.userValue.name;
            this.lSubplaces[row].place = this.lPlaces.find(place => place.id == this.lSubplaces[row].placeid)?.name!;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Subplace is updated' });
          }
        })
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid name or type' });
    }

  }

  onRowEditCancel(subplace: Subplace, row: number) {
    this.lSubplaces[row] = this.clonedSubplaces[subplace.id!];
    delete this.clonedSubplaces[subplace.id!];
    if (this.lSubplaces[row].id == 0)
      delete this.lSubplaces[row]
  }

  onRowDelete(subplace: Subplace, row: number) {
    this.backendService.deleteSubplace(subplace).subscribe({
      next: () => {
        delete this.clonedSubplaces[subplace.id!];
        delete this.lSubplaces[row];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Subplace is deleted' });
      }
    })

  }

}
