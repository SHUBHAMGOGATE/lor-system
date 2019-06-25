import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../services/request.service';
import { RejectModalComponent } from '../reject-modal/reject-modal.component';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-request-data-table',
  templateUrl: './request-data-table.component.html',
  styleUrls: ['./request-data-table.component.css']
})
export class RequestDataTableComponent implements OnInit {
  public data$;
  public pendingRequestDataLoaded:boolean=false;
  public completedRequestDataLoaded:boolean=false;
  constructor(
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal ,
    private requestService: RequestService ,
    private authService: AuthService)
    {
      this.completedRequestDataLoaded=false;
      this.pendingRequestDataLoaded=false;
      this.authService.currentUser.subscribe(x => {this.data$ = x.role; });
    this.requestService.getPendingRequests().subscribe(x => {
      this.pendingRequestDataLoaded=true;
      this.completedRequestDataLoaded=true;
      this.pendingReqList$ = x;
      this.pendingReqList_filtered$=this.pendingFormFilter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(x,text))
      )
    });
    this.requestService.getCompletedRequests().subscribe(x => {
      this.complReqList$ = x;
      this.complReqList_filtered$=this.complFormFilter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(x,text))
      )
    });

    }
  public visibleFields = {
    tpo: {
      th: ['UID', 'NAME', 'YEAR of Passing', 'Company', 'Inspect|Accept|Reject'],
      td: ['yearOfGrad', 'company']
    },
    hod: {
      th: ['UID', 'NAME', 'YEAR of Passing', 'Publication Details', 'Inspect|Accept|Reject'],
      td: ['yearOfGrad', 'pubDetails']
    },
    teacher: {
      th: ['UID', 'NAME', 'YEAR of Passing', 'Publication Details', 'Inspect|Accept|Reject'],
      td: ['yearOfGrad', 'pubDetails']
    }
  };

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
  public pendingFormFilter=new FormControl('');
  public pendingReqList_filtered$;
  public complReqList_filtered$;
  public complFormFilter=new FormControl('');
  public complReqList$;
  search(arr,text){
    return arr.filter(request=>{
      const term=text.toLowerCase();
      return (request.first_name+" "+request.last_name).toLowerCase().includes(term)
         || request.uid.toString().includes(term)
    })
  }
  ngOnInit() {

  }

  open(req) {
    const modalRef = this.modalService.open(RequestModalComponent);
    modalRef.componentInstance.data = req;
  }
  reject(req, index) {
    const modalRef = this.modalService.open(RejectModalComponent);
    modalRef.componentInstance.data.subscribe(x => {
      console.log(req);
      this.requestService.rejectRequests(x, req._id, req.level).subscribe(x => {
        this.pendingReqList$.splice(index, 1);
      });
    });
  }
  accept(req, index) {
    console.log(req);
    this.requestService.acceptRequests(req._id, req.level).subscribe(x => {
      console.log('DONE');
      this.pendingReqList$.splice(index, 1);
    });
  }
}
