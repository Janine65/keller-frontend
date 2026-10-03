import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { Bind } from 'primeng/bind';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';

@Component({
    selector: 'keller-frontend-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, Bind, InputText, ButtonDirective, ButtonIcon, ButtonLabel]
})
export class UserRegisterComponent {
  private messageService = inject(MessageService);
  private backendService = inject(BackendService);
  private authService = inject(AuthService);
  ref = inject(DynamicDialogRef);
  conf = inject(DynamicDialogConfig);


  selUser: User = new User()

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
