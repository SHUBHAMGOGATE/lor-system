import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  step=0;
  email:string;
  loading_email_response:boolean=false;
  loading_otp_response:boolean=false;
  loading_email_error=null;
  loading_otp_error=null;
  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,private router:Router,private userService:UserService,private authService:AuthService) { }
  public email_form=this.formBuilder.group({
    email:['',Validators.email]
  })

  public otp_form=this.formBuilder.group({
    otp:['',Validators.required]
  })
  ngOnInit() {

  }
  sendEmail(){
    this.loading_email_response=true;
    console.log(this.email_form.value.email);
    this.email=this.email_form.value.email;
    this.userService.verifyEmail(this.email_form.value.email).subscribe(
      x=>{
        this.step++;
        this.loading_email_response=false;
        this.loading_email_error=null;
        // if(x["status"]===200){
        //   console.log(x["message"])
        //   this.step++;
        // }else{
        //   console.log(x["message"]);
        // }
      },
      error=>{
        this.loading_email_response=false;
        this.loading_email_error=error.error.message;
      }
    )
  }

  verifyOtp(){
    console.log(this.email_form.value.email+" "+ this.otp_form.value.otp);
    this.loading_otp_response=true;
    this.userService.editEmail(this.email,this.otp_form.value.otp).subscribe(
      x=>{
        this.loading_otp_response=false;
        this.loading_otp_error=null;
        console.log(x)
        this.authService.updateEmail(this.email,x['token'])
        this.router.navigate(['/login'])
        // if(x["status"]===200){
        //   console.log(x["message"])

        // }else{
        //   console.log(x["message"])
        // }
      },
      error=>{
        this.loading_otp_response=false;
        this.loading_otp_error=error.error.message;

      }
    )
  }



}
