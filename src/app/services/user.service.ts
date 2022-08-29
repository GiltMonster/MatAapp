import { environment } from './../../environments/environment';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.endPoint}users`);
  }

  insert(user?: User): Observable<User> {
    if (!user) {return EMPTY;}
    return this.http.post<User>(`${environment.endPoint}users`, user);

  }

  update(user?: User):Observable<User>{
    if (!user) { return EMPTY}
    return this.http.put<User>(`${environment.endPoint}users/${user.id}`, user);
  }

  remove(id: number): Observable<any>{
  return this.http.delete<any>(`${environment.endPoint}users/${id}`)

  }
}
