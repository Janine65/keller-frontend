import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private header! : HttpHeaders;

  constructor(private http: HttpClient) { 
    this.header = new HttpHeaders({
      'Access-Control-Allow-Origin': environment.apiUrlSelf,
      'Access-Control-Allow-Methods': "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization'
      });
    console.log(this.header);   
  }

  getAbout(): Observable<{}> {
    const apiURL = environment.apiUrl + '/about';
    return this.http.get<{}>(apiURL, {headers: this.header});
  }

  doLogin(login: string, password: string): Observable<{}> {
    const apiURL = environment.apiUrl + '/login';
    return this.http.post<{}>(apiURL, JSON.stringify({login: login, password: password}), {headers: this.header});
  }

}
