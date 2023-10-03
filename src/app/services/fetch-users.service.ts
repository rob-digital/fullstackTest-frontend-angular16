import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { User } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class FetchUsersService{

  urlPrefix = environment.BASE_URL;
  dataPayload: any;

  constructor(private httpClient: HttpClient ) {}

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(this.urlPrefix + "/api/v1/testuser/all",  { responseType: 'json' })
  }

  getUserById(userId: number): Observable<any> {
    return this.httpClient.get<any>(this.urlPrefix + "/api/v1/testuser/" + userId,  { responseType: 'json' });
  }

  insertUser(payload: User){
     this.httpClient.post<User>(this.urlPrefix + "/api/v1/testuser/insert/", payload).subscribe(response => {
      this.dataPayload = response;
      alert("User saved");
     })
  }
}
