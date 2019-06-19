import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentsListSubject:BehaviorSubject<any>;

  public get documentsList() : Observable<any> {
    return this.documentsListSubject.asObservable();
  }

  constructor(private http:HttpClient,private authservice:AuthService) {
    this.documentsListSubject=new BehaviorSubject([]);
    this.http.get("http://localhost:3000/LORFormats/filenames",{
      params:new HttpParams().set('email',this.authservice.currentUserValue.email)
    }).subscribe(
      x=>{
        console.log(x);
        this.documentsListSubject.next(x);
      },
      err=>{
        console.log(err);
      }
    )
  }

  // getDocuments(){
  //   return this.http.get("http://localhost:3000/LORFormats/filenames",{
  //     params:new HttpParams().set('email',this.authservice.currentUserValue.email)
  //   })
  // }
  uploadDocuments(data:FormData,filename:string){
    return this.http.post<any>("http://localhost:3000/LORFormats/upload", data, {
      reportProgress: true,
      observe: 'events',
      params:new HttpParams().set('email',this.authservice.currentUserValue.email)
    }).pipe(map((event) => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          console.log(filename);
          this.documentsListSubject.value.push({filename})
          this.documentsListSubject.next(this.documentsListSubject.value)
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
  downloadDocument(filename:string){
    return this.http.get('http://localhost:3000/LORFormats/download/'+filename,{
      params:new HttpParams().set('email',this.authservice.currentUserValue.email),
      responseType: 'blob'
    })
  }

  deleteDocument(filename:string){
    return this.http.delete(`http://localhost:3000/LORFormats/delete/${filename}`,{
      params:new HttpParams().set('email',this.authservice.currentUserValue.email)
    }).pipe(
      map(x=>{
        this.documentsListSubject.next(this.documentsListSubject.value.filter(element=>element.filename!==filename));
      })
    )
  }
}
