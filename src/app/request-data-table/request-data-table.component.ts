import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../services/request.service';
import { RejectModalComponent } from '../reject-modal/reject-modal.component';

@Component({
  selector: 'app-request-data-table',
  templateUrl: './request-data-table.component.html',
  styleUrls: ['./request-data-table.component.css']
})
export class RequestDataTableComponent implements OnInit {
  data$: Observable<object>;
  constructor(public activatedRoute: ActivatedRoute,private modalService: NgbModal ,private requestService:RequestService ) {}
  // public reqList$ = [
  //   {
  //     uid: '2017140015',
  //     first_name: 'Shubham',
  //     last_name: 'Gogate',
  //     email: 'gogateshubham@gmail.com',
  //     contact: 7506854640,
  //     yearofgrad: 2021,
  //     category: 1,
  //     company: 'Barclays',
  //     pubdetails: 'Hello World Just Tryin to live my life here',
  //     prof: 'Prof Jignesh Sisodia',
  //     branch: 'IT',
  //     status: 'Accepted',
  //   },
  //   {
  //     uid: '2017140015',
  //     first_name: 'Shubham',
  //     last_name: 'Gogate',
  //     email: 'gogateshubham@gmai.com',
  //     contact: 7506854640,
  //     yearofgrad: 2021,
  //     category: 1,
  //     pubdetails: 'Hello World Just Tryin to live my life here',
  //     prof: 'Prof Jignesh Sisodia',
  //     branch: 'IT',
  //     status: 'HOD Verification',
  //     reasonofrejection: 'Invalid Contact Details:TPO'
  //   }
  // ];
  public pendingReqList$;
  public complReqList$;
  ngOnInit() {
    this.data$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.requestService.getPendingRequests().subscribe(x=>{
      this.pendingReqList$=x;
    });
    this.requestService.getCompletedRequests().subscribe(x=>{
      this.complReqList$=x;
    });
  }

  open(req) {
    const modalRef = this.modalService.open(RequestModalComponent);
    modalRef.componentInstance.data = req;
  }
  reject(req,index){
    const modalRef = this.modalService.open(RejectModalComponent);
    modalRef.componentInstance.data.subscribe(x=>{
      console.log(req);
      this.requestService.rejectRequests(x,req._id,req.level).subscribe(x=>{
        this.pendingReqList$.splice(index,1);
      })
    })
  }
  accept(req,index){
    console.log(req);
    this.requestService.acceptRequests(req._id,req.level).subscribe(x=>{
      console.log("DONE");
      this.pendingReqList$.splice(index,1);
    });
  }
}
