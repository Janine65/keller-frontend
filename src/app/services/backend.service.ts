import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthService } from './auth.service';
import { ReturnStruct } from '@models/generel';
import { Place, Placetype, Subplace } from '@models/places';
import { Alcoholic, Object2Subplace } from '@models/things';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private header!: HttpHeaders;
  private httpConfig: { headers: HttpHeaders, withCredentials: boolean } = { headers: this.header, withCredentials: true }

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
    return this.http.get<{}>(apiURL, { headers: this.header });
  }

  doLogin(login: string, password: string): Observable<any> {
    const apiURL = environment.apiUrl + '/login';
    return this.http.post<{}>(apiURL, { login: login, password: password }, { headers: this.header });
  }

  doLogout(): Observable<any> {
    const apiURL = environment.apiUrl + '/logout';
    return this.http.post<{}>(apiURL, {}, this.httpConfig);
  }

  getUsers(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/users';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getPlaces(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/places';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertPlace(place: Place): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/places/insert';
    return this.http.put<ReturnStruct>(apiURL, place, this.httpConfig)
  }

  updatePlace(place: Place): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/places/update';
    return this.http.post<ReturnStruct>(apiURL, place, this.httpConfig)
  }

  deletePlace(place: Place): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/places/delete?id=' + place.id;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }

  getPlacetypes(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/placetypes';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertPlacetype(placetype: Placetype): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/placetypes/insert';
    return this.http.put<ReturnStruct>(apiURL, placetype, this.httpConfig)
  }

  updatePlacetype(placetype: Placetype): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/placetypes/update';
    return this.http.post<ReturnStruct>(apiURL, placetype, this.httpConfig)
  }

  deletePlacetype(placetype: Placetype): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/placetypes/delete?id=' + placetype.id;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }

  getSubplaces(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/subplaces';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertSubplace(subplace: Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/subplaces/insert';
    return this.http.put<ReturnStruct>(apiURL, subplace, this.httpConfig)
  }

  updateSubplace(subplace: Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/subplaces/update';
    return this.http.post<ReturnStruct>(apiURL, subplace, this.httpConfig)
  }

  deleteSubplace(subplace: Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/subplaces/delete?id=' + subplace.id;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }

  getAllThing2Subplaces(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/subplaces';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getAlcoholics(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertAlcoholic2Subplace(alcoholic: Alcoholic, obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic/subplaces/insert';
    return this.http.put<ReturnStruct>(apiURL, {alcoholic: alcoholic, obj2sub: obj2sub}, this.httpConfig)
  }

  updateAlcoholic2Subplace(alcoholic: Alcoholic, obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcohoic/subplaces/update';
    return this.http.post<ReturnStruct>(apiURL, {alcoholic: alcoholic, obj2sub: obj2sub}, this.httpConfig)
  }

  deleteAlcoholic2Subplace(obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic/subplaces/delete?alcoholicid=' + obj2sub.alcoholicid + '&subplaceid=' + obj2sub.subplaceid ;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }

  getFood(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/food';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getNonalcoholics(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonalcoholic';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getNonfood(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonfood';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

}
