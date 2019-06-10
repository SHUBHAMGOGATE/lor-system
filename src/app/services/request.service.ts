import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  makeRequest(request:any){
    return this.http.post('http://localhost:3000/user/dashboard/addRequest',request,
    {
      params:new HttpParams().set("email",this.authService.currentUserValue.email)
    });
  }

  getPendingRequests(){
    return this.http.get('http://localhost:3000/user/dashboard/viewPendingRequests',
    {
      params:new HttpParams().set("email",this.authService.currentUserValue.email)
    });
  }

  getCompletedRequests(){
    return this.http.get('http://localhost:3000/user/dashboard/viewCompletedRequests',
    {
      params:new HttpParams().set("email",this.authService.currentUserValue.email)
    });
  }


  rejectRequests(reasonOfRejection:String,id:number,level:number){
    return this.http.post('http://localhost:3000/request/reject',
    {
      email:this.authService.currentUserValue.email,
      reasonOfRejection,id,level
    })
  }
  acceptRequests(id:number,level:number){
    return this.http.post('http://localhost:3000/request/accept',
    {
      email:this.authService.currentUserValue.email,
      id,level
    })
  }

}
