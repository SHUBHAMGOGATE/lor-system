import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {

      return this.http.post<any>(`http://localhost:3000/user/login`, { email, password })
          .pipe(map(user => {

            console.log(user);
              // login successful if there's a jwt token in the response
              if (user && user.role!=null) {
                  switch (user.role) {
                    case 0:
                      user.role="student";
                      break;
                    case 1:
                      user.role="tpo";
                      break;
                    case 2:
                      user.role="hod";
                      break;
                    case 3:
                      user.role="teacher";
                      break;
                    default:
                      break;
                  }
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
