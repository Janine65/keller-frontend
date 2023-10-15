import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'keller-frontend-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(private backendService: BackendService) {}

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

  }

  onReset() {

  }

}
