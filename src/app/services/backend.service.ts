import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private header! : HttpHeaders;
  private httpConfig : {headers: HttpHeaders, withCredentials: boolean} = {headers: this.header, withCredentials: true}

  constructor(private http: HttpClient, private authService: AuthService) { 
    
    this.header = new HttpHeaders({
      'Access-Control-Allow-Origin': environment.apiUrlSelf,
      'Access-Control-Allow-Methods': "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization'
      });
    console.log(this.header);   

    this.httpConfig.headers = this.header
  }

  getAbout(): Observable<{}> {
    const apiURL = environment.apiUrl + '/about';
    return this.http.get<{}>(apiURL, {headers: this.header});
  }

  doLogin(login: string, password: string): Observable<any> {
    const apiURL = environment.apiUrl + '/login';
    const retVal = this.http.post<{}>(apiURL, {login: login, password: password}, {headers: this.header});
    return retVal
  }

  doLogout(): Observable<any> {
    const apiURL = environment.apiUrl + '/logout';
    const retVal = this.http.post<{}>(apiURL, {}, this.httpConfig);
    return retVal

  }

  getPlaces(): Observable<any> {
    const apiURL = environment.apiUrl + '/places';
    return this.http.get<any>(apiURL, this.httpConfig);
  }

}
