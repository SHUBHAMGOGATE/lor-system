import { Component, OnInit } from '@angular/core';
import { Request } from '../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { Observable } from 'rxjs';
import { RequestService } from '../services/request.service';
@Component({
  selector: 'app-student-request-status',
  templateUrl: './student-request-status.component.html',
  styleUrls: ['./student-request-status.component.css']
})
export class StudentRequestStatusComponent implements OnInit {
  public reqList = [
    {
      uid: '2017140015',
      first_name: 'Shubham',
      last_name: 'Gogate',
      email: 'gogateshubham@gmail.com',
      contact: 7506854640,
      yearofgrad: 2021,
      category: 1,
      company: 'Barclays',
      pubdetails: 'Hello World Just Tryin to live my life here',
      prof: 'Prof Jignesh Sisodia',
      branch: 'IT',
      status: 'Accepted',
    },
    {
      uid: '2017140015',
      first_name: 'Shubham',
      last_name: 'Gogate',
      email: 'gogateshubham@gmai.com',
      contact: 7506854640,
      yearofgrad: 2021,
      category: 1,
      pubdetails: 'Hello World Just Tryin to live my life here',
      prof: 'Prof Jignesh Sisodia',
      branch: 'IT',
      status: 'HOD Verification',
      reasonofrejection: 'Invalid Contact Details:TPO'
    }
  ];
  public progress(req:Request){
    //console.log((req.level+1)*25);
    return (req.level+1)*25 + '%';
    // switch (req.status) {
    //   case "Submitted":
    //     return '25%';
    //     break;
    //   case "HOD Verification":
    //     return "50%";
    //     break;
    //   case "Teacher Verification":
    //     return "75%";
    //   default:
    //     return "100%";
    //     break;
    // }
  }
  public pendingReq:Observable<any>;
  public completedReq:Observable<any>;
  constructor(private modalService: NgbModal,private requestService:RequestService) {}

  ngOnInit() {
    this.pendingReq=this.requestService.getPendingRequests();

    this.completedReq=this.requestService.getCompletedRequests();
  }

  open(req) {
    const modalRef = this.modalService.open(RequestModalComponent);
    modalRef.componentInstance.data = req;
  }

}
