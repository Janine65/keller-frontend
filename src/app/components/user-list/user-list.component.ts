import { Component, OnInit } from '@angular/core';
import { UserRegisterComponent } from '@components/user-register/user-register.component';
import { User } from '@models/user';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'keller-frontend-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [DialogService]
})
export class UserListComponent implements OnInit {

  lUsers : User[] = [];
  selUser: User | undefined;

  isLoading = true;

  inEditMode = false;

  constructor(
    private backendService: BackendService,
    private dialogService: DialogService)
  {}

  ngOnInit(): void {
      this.backendService.getUsers().subscribe({
        next: (list) => {
          this.lUsers = list.data as User[];
          this.lUsers.forEach(user => {
            if (user.userid && user.userid > 0) {
              user.user = this.lUsers.find(u => u.id == user.userid)?.name;
            }
          })
          this.isLoading = false;
        }
      })
  }

  doDelete(user: User) {
    // TODO
    this.selUser = user;

    this.backendService.deleteUser(this.selUser).subscribe({
      next: (result) => {
        const ind = this.lUsers.findIndex(u => u.id == this.selUser!.id);
        this.lUsers.splice(ind, 1);
      }
    })
  }

  doRegister() {
    // TODO
    const ref = this.dialogService.open(UserRegisterComponent, {
      data:  undefined,
      header: 'Register a new User',
      width: '50%',
      height: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      closable: true,
      resizable: true,
      modal: true,
      closeOnEscape: true,
      draggable: true
    })

    ref.onClose.subscribe({
      next: (userRet) => {
        if (userRet) {
          this.lUsers.push(userRet as User)
        }
      }
    })
  }
}
