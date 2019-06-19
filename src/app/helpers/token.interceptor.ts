import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    if(this.authService.currentUserValue){
    let newRequest:HttpRequest<any>=request.clone({
      headers:new HttpHeaders().set('Authorization',`Bearer ${this.authService.currentUserValue.token}`)
    })
    console.log(newRequest.headers)
    return next.handle(newRequest);
    }
    return next.handle(request);
  }
}

