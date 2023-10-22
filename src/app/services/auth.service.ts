import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { User } from '@models/user';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject?: BehaviorSubject<User>;
  private apiUrl: string;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {
    const user = localStorage.getItem('login')
    if (user) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(user));
    }
    this.apiUrl = environment.apiUrl
    console.log(this.apiUrl)

  }

  public get userValue(): User {
    return (this.userSubject ? this.userSubject.value : new User());
  }

  isLogged(): boolean {
    return !!(this.userSubject && this.userValue.token != '')
  }


  async login(userData: User) {
    const token = userData.token.split(';');
    userData.token = token[0];
    this.userSubject = new BehaviorSubject<User>(userData);
    localStorage.setItem('login', JSON.stringify(userData));
    this.cookieService.set('Authorization', userData.token, { expires: Number(token[2].replace('Max-Age=',''))} );
  }

  logout() {
    this.userSubject = undefined;
    localStorage.removeItem('login');
    this.cookieService.delete('Authorization');
    
  }
}
