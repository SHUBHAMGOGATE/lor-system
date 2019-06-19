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

  verifyEmail(email){
    return this.httpclient.get('http://localhost:3000/verifyEmail/sendMail',
    {
      params:new HttpParams().set('email',email)
    })
  }
  editEmail(email,key){
    return this.httpclient.post('http://localhost:3000/user/dashboard/editEmail',
    {
      email,
      key
    },
    {
      params:new HttpParams().set("email", this.authService.currentUserValue.email.toString())
    })
  }

  verifyOtp(email,key){
    return this.httpclient.post('http://localhost:3000/verifyEmailOTP',
    {
      key
    },
    {
      params:new HttpParams().set('email',email)
    })
  }
  getUser(){
    return this.httpclient.get('http://localhost:3000/user/dashboard/viewProfile',
    {
      params:new HttpParams().set("email", this.authService.currentUserValue.email.toString())
    }
    )
  }
  updateUser(value){
    return this.httpclient.post('http://localhost:3000/user/dashboard/editProfile',
    value,
    {
      params:new HttpParams().set("email", this.authService.currentUserValue.email.toString())
    }
    )
  }

  viewProfessors(){
    return this.httpclient.get('http://localhost:3000/professors');
  }


}
