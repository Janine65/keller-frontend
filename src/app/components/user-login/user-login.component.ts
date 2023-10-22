import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'keller-frontend-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(private backendService: BackendService, private messageService: MessageService, private authService: AuthService, private router: Router) {}

  login = '';
  password = ''
  loading = false;
  loginForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
  });      
  }
  onLogin() {
    if (this.loginForm.get('login')?.invalid || this.loginForm.get('password')?.invalid) {
        this.messageService.add({
          key: 'error',
          severity: 'error',
          summary: 'Fehleingabe',
          detail: 'Login oder Passwort nicht korrekt eingegeben'
        });
        return;
    }
    this.backendService.doLogin(this.loginForm.get('login')?.value as string, this.loginForm.get('password')?.value as string).subscribe({
      next: async (retValue) => {        
        delete retValue.data['password'];        
        retValue.data['token'] = retValue.cookie.replace('Authorization=','');
        await this.authService.login(retValue.data);
        await this.router.navigate(['/']);
        window.location.reload();
      }
    })

  }

  onReset() {
    this.loginForm.get('login')!.setValue('');
    this.loginForm.get('password')!.setValue('');
  }

}
