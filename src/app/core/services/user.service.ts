import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlService: string = 'https://simpletaskmanagerc.azurewebsites.net/Tasks/';
  private userLoged: User = null;
  constructor(private http: HttpClient) { }

  storeUser(user: User) {
    this.userLoged = user;
  }

  getStoredUser(): User {
    return this.userLoged;
  }

  getUser(email: string): Observable<User> {
    let url: string = this.urlService + 'getUser/' + email;
    return this.http.get<User>(url);
  }
}
