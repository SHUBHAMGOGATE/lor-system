import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private modalService: NgbModal) {}
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(request).pipe(map(event=>{
      if(event instanceof HttpErrorResponse){
        const modalref=this.modalService.open(AlertModalComponent);
        modalref.componentInstance.data = event;
      }
      // if(event instanceof HttpResponse){
      //   const modalref=this.modalService.open(AlertModalComponent);
      //   modalref.componentInstance.data = event;
      // }else if(event instanceof HttpErrorResponse){
      //   const modalref=this.modalService.open(AlertModalComponent);
      //   modalref.componentInstance.data = event;
      // }
      return event;
    }))
  }
}
