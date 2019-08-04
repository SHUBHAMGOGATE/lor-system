import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from '../services/analytics.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModalComponent } from '../request-modal/request-modal.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  body;
  type=0;
  public obs:Observable<any>=null;
  constructor(private route: ActivatedRoute,private analytics:AnalyticsService,private modalService:NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(params);
      if(params['professor']){
        this.type=3;
        //console.log(params['professor']);
        this.obs=this.analytics.analyseByProfessor(params['year'],params['branch'],params['professor'])
      }else if(params['branch']){
        this.type=2;
        //console.log(params['branch']);
        this.obs=this.analytics.analyseByDept(params['year'],params['branch'])
      }else if(params['year']){
        this.type=1;
        //console.log(params['year']);
        this.obs=this.analytics.analyseByYear(params['year'])

      }else{
        this.type=0;
        //console.log('hello');
        this.obs=this.analytics.getAcademicYears()
      }
    });
  }
  open(req) {
    const modalRef = this.modalService.open(RequestModalComponent);
    modalRef.componentInstance.data = req;
  }

}
