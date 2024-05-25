import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthService } from './auth.service';
import { ReturnStruct } from '@models/generel';
import { Place, Placetype, Subplace } from '@models/places';
import { Alcoholic, Food, Nonalcoholic, Nonfood, Object2Subplace } from '@models/things';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private header!: HttpHeaders;
  private httpConfig: { headers: HttpHeaders, withCredentials: boolean } = { headers: this.header, withCredentials: true }

  constructor(private http: HttpClient) {

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

  doRefreshToken(userData: User): Observable<any> {
    const apiURL = environment.apiUrl + '/refreshToken';
    return this.http.post<any>(apiURL, userData, this.httpConfig);
  }

  getUsers(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/users';
    return this.http.get<any>(apiURL, this.httpConfig);
  }

  createUser(user: User): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/signup';
    return this.http.post<any>(apiURL, user, this.httpConfig)
  }

  deleteUser(user: User): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/users/' + user.id;
    return this.http.delete<any>(apiURL, this.httpConfig)
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

  getAllThings(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getAllThing2Subplaces(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/subplaces';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  updateObject2Subplace(obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/subplaces/update';
    return this.http.post<ReturnStruct>(apiURL, obj2sub, this.httpConfig)
  }

  deleteObject2Subplace(obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/subplaces/delete?id=' + obj2sub.id ;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }


  insertOject2Subplace(obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/subplaces/insert';
    return this.http.put<ReturnStruct>(apiURL, obj2sub, this.httpConfig)
  }

  getAlcoholics(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getOneAlcoholic(id: number): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic/id?id=' + id;
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertAlcoholic(alcoholic: Alcoholic): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic/insert';
    return this.http.put<ReturnStruct>(apiURL, alcoholic, this.httpConfig)
  }

  updateAlcoholic(alcoholic: Alcoholic): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic/update';
    return this.http.post<ReturnStruct>(apiURL, alcoholic, this.httpConfig)
  }

  deleteAlcoholic(alcoholic: Alcoholic): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic/delete?id=' + alcoholic.id;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }

  insertAlcoholic2Subplace(alcoholic: Alcoholic, obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/alcoholic/subplaces/insert';
    return this.http.put<ReturnStruct>(apiURL, {alcoholic: alcoholic, obj2sub: obj2sub}, this.httpConfig)
  }

  getFood(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/food';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getOneFood(id: number): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/food/id?id=' + id;
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertFood(food: Food): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/food/insert';
    return this.http.put<ReturnStruct>(apiURL, food, this.httpConfig)
  }

  updateFood(food: Food): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/food/update';
    return this.http.post<ReturnStruct>(apiURL, food, this.httpConfig)
  }

  deleteFood(food: Food): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/food/delete?id=' + food.id;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }

  insertFood2Subplace(food: Food, obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/food/subplaces/insert';
    return this.http.put<ReturnStruct>(apiURL, {food: food, obj2sub: obj2sub}, this.httpConfig)
  }

  getNonalcoholics(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonalcoholic';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getOneNonalcoholic(id: number): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonalcoholic/id?id=' + id;
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertNonalcoholic(nonalcoholic: Nonalcoholic): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonalcoholic/insert';
    return this.http.put<ReturnStruct>(apiURL, nonalcoholic, this.httpConfig)
  }

  updateNonalcoholic(nonalcoholic: Nonalcoholic): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonalcoholic/update';
    return this.http.post<ReturnStruct>(apiURL, nonalcoholic, this.httpConfig)
  }

  deleteNonalcoholic(nonalcoholic: Nonalcoholic): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonalcoholic/delete?id=' + nonalcoholic.id;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }

  insertNonalcoholic2Subplace(nonalcoholic: Nonalcoholic, obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonalcoholic/subplaces/insert';
    return this.http.put<ReturnStruct>(apiURL, {nonalcoholic: nonalcoholic, obj2sub: obj2sub}, this.httpConfig)
  }

  getNonfood(): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonfood';
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  getOneNonfood(id: number): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonfood/id?id=' + id;
    return this.http.get<ReturnStruct>(apiURL, this.httpConfig);
  }

  insertNonfood(nonfood: Nonfood): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonfood/insert';
    return this.http.put<ReturnStruct>(apiURL, nonfood, this.httpConfig)
  }

  updateNonfood(nonfood: Nonfood): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonfood/update';
    return this.http.post<ReturnStruct>(apiURL, nonfood, this.httpConfig)
  }

  deleteNonfood(nonfood: Nonfood): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonfood/delete?id=' + nonfood.id;
    return this.http.delete<ReturnStruct>(apiURL, this.httpConfig)
  }
  insertNonfood2Subplace(nonfood: Nonfood, obj2sub: Object2Subplace): Observable<ReturnStruct> {
    const apiURL = environment.apiUrl + '/basedata/things/nonfood/subplaces/insert';
    return this.http.put<ReturnStruct>(apiURL, {nonfood: nonfood, obj2sub: obj2sub}, this.httpConfig)
  }


}
