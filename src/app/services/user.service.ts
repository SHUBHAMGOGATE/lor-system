import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient,private authService:AuthService) { }

  registerUser(user: any) {
    return this.httpclient.post('http://localhost:3000/user/register', user);
  }

  getUser(){
    return this.httpclient.get('http://localhost:3000/user/dashboard/viewProfile',
    {
      params:new HttpParams().set("email", this.authService.currentUserValue.email.toString())
    }
    )
  }
}
