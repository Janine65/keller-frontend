import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { User } from '@models/user';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(new User());
  private isLoggedBehavor = new BehaviorSubject(false);
  private apiUrl: string;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService,
    private backendService: BackendService
  ) {
    const userString = localStorage.getItem('login')
    if (userString) {
      const user: User = JSON.parse(userString)
        this.userSubject.next(user);
        this.backendService.doRefreshToken(user).subscribe({
          next: (retData) => {
            const userData = retData.data;
            const token = retData.cookie.split(';');
            userData.token = token[0];
            this.userSubject.next(userData);
            localStorage.setItem('login', JSON.stringify(userData));
            this.cookieService.set('Authorization', userData.token, { expires: Number(token[2].replace('Max-Age=',''))} );
            this.isLoggedBehavor.next(true);
        
          }
        })
    }
    this.apiUrl = environment.apiUrl
    console.log(this.apiUrl)

  }

  public getUserValue(): Observable<User> {
    return this.userSubject.asObservable()
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedBehavor.asObservable()
  }

  public get userValue(): User {
    return this.userSubject.getValue();
  }

  isLogged(): boolean {
    return !!(this.userSubject && this.userValue.token != '')
  }


  async login(userData: User) {
    const token = userData.token.split(';');
    userData.token = token[0];
    this.userSubject.next(userData);
    localStorage.setItem('login', JSON.stringify(userData));
    this.cookieService.set('Authorization', userData.token, { expires: Number(token[2].replace('Max-Age=',''))} );
    this.isLoggedBehavor.next(true);
  }

  logout() {
    this.isLoggedBehavor.next(false);
    this.userSubject.next(new User());
    localStorage.removeItem('login');
    this.cookieService.delete('Authorization');
  }
}
