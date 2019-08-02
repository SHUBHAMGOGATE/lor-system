import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http:HttpClient) { }

  analyseByYear(year){
    return this.http.get('http://localhost:3000/user/dashboard/analyseByYear',
    {
      params:new HttpParams().set('year',year)
    })
  }
  analyseByDept(year,dept){
    return this.http.get('http://localhost:3000/user/dashboard/analyseByDept',
    {
      params:new HttpParams().append('year',year).append('dept',dept)
    })
  }
  analyseByProfessor(year,dept,prof){
    return this.http.get('http://localhost:3000/user/dashboard/analyseByProf',
    {
      params:new HttpParams().append('year',year).append('dept',dept).append('pfirst_name',prof.split(' ')[0]).append('plast_name',prof.split(' ')[1])
    })
  }

  getAcademicYears(){
    return this.http.get('http://localhost:3000/user/dashboard/getAcademicYears');
  }
}
