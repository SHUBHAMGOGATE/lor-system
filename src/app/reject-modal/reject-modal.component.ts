import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.css']
})
export class RejectModalComponent implements OnInit {

  @Output() public data= new EventEmitter();;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  outputData(reasonOfRejection){
    this.data.emit(reasonOfRejection.value);
    this.activeModal.close('Reason Given Submitted');
  }
}
