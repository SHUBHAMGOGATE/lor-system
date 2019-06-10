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
  public professors:any;
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
      prof: ['', Validators.required],
      branch: ['', Validators.required]

    });
    this.userService.viewProfessors().subscribe(
      x=>{
        this.professors=x;
        this.professors=this.professors.map(a=>a.first_name+" "+a.last_name)
        console.log(this.professors)
      }
    )

  }
  onSubmit(){
    console.log(this.request_form.value);
    this.requestService.makeRequest(this.request_form.value).subscribe(
      x=>this.router.navigate(['../status'],{relativeTo:this.route})
    );
  }
}
