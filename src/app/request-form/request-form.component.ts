import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  public years:number[];
  public all_professors:any;
  public filter_professors:any;
  request_form:FormGroup;
  constructor(private fb:FormBuilder,private requestService:RequestService,private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.years=Array.from(new Array(5), (x,i) => i+2019);
  }

  ngOnInit() {
    this.request_form=this.fb.group({
      yearOfGrad:['',Validators.required],
      category: ['', Validators.required],
      company: [''],
      pubDetails:['',Validators.required],
      reasonForLOR:['',Validators.required],
      prof: ['', Validators.required],
      branch: ['', Validators.required],

    });
    this.userService.viewProfessors().subscribe(
      x=>{
        this.filter_professors=x;
        this.all_professors=x;
        console.log(this.all_professors)
      }
    )

  }
  onSubmit(){
    console.log(this.request_form.value);
    this.requestService.makeRequest(this.request_form.value).subscribe(
      x=>this.router.navigate(['../status'],{relativeTo:this.route})
    );
  }
  filterProf(event){
    console.log(event.target.value=='IT');
    this.filter_professors=this.all_professors.filter(element=>element.dept===event.target.value);
    console.log(this.filter_professors)
  }
}
