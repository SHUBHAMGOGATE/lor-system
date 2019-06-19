import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit,OnDestroy {
  step=0;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,private router:Router,private authService:AuthService) { }
  public email_form=this.formBuilder.group({
    email:['',Validators.email]
  })
  public new_password_form=this.formBuilder.group({
    new_password:['',Validators.required],
    retype_password:['',Validators.required]
  })
  public otp_form=this.formBuilder.group({
    otp:['',Validators.required]
  })
  ngOnInit() {
    if(this.authService.currentUserValue.email){
      this.email_form.value.email=this.authService.currentUserValue.email;
      this.sendEmail();
    }
  }
  sendEmail(){
    console.log(this.email_form.value.email);
    this.authService.sendEmail(this.email_form.value.email).subscribe(
      x=>{
        this.step++;
        this.email_form.value.email=this.authService.currentUserValue.email;
        // if(x["status"]===200){
        //   console.log(x["message"])
        //   this.step++;
        // }else{
        //   console.log(x["message"]);
        // }
      }
    )
  }

  verifyOtp(){
    console.log(this.email_form.value.email+" "+ this.otp_form.value.otp);
    this.authService.verifyOtp(this.email_form.value.email,this.otp_form.value.otp).subscribe(
      x=>{
        this.step++;
        if(x["status"]===200){
          console.log(x["message"])

        }else{
          console.log(x["message"])
        }
      }
    )
  }

  submit(){
    if(this.new_password_form.controls.new_password.value!=this.new_password_form.controls.retype_password.value){
      console.log(this.new_password_form.value);
    }else{
      console.log(this.new_password_form.value)
      this.authService.changePassword(this.email_form.value.email,this.otp_form.value.otp,this.new_password_form.value.new_password).subscribe(x=>{
        console.log(x);
        this.router.navigate(['/login'])
      });
    }
  }
  ngOnDestroy(){
    //this.sub.unsubscribe()
  }
}
