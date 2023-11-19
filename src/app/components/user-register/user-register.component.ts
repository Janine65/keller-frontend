import { Component } from '@angular/core';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'keller-frontend-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {

  selUser: User = new User()

  constructor(
    private messageService: MessageService, 
    private backendService: BackendService,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public conf: DynamicDialogConfig)
  { }

  doSave() {
    if (this.selUser.name && this.selUser.email && this.selUser.login && this.selUser.password) {
      if (this.selUser.name == '' || this.selUser.email == '' || this.selUser.login == '' || this.selUser.password == '') {
        this.messageService.add({severity: 'error', summary: 'Register User', detail: 'Not all necessary fields have values'})
      }
      this.selUser.userid = this.authService.userValue.id;
      this.backendService.createUser(this.selUser).subscribe({
        next: (result) => {
          (result.data as User).user = this.authService.userValue.name
          this.ref.close(result.data);
        }
      })
    } else {
      this.messageService.add({severity: 'error', summary: 'Register User', detail: 'Not all necessary fields have values'})
    }
  }

  doClose() {
    this.ref.close()
  }

}
