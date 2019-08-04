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
  email_form_loader=false;
  otp_form_loader=false;
  new_password_form_loader=false;
  email_form_error:string=null;
  otp_form_error:string=null;
  new_password_form_error:string=null;
  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,private router:Router,private authService:AuthService) { }
  public email_form=this.formBuilder.group({
    email:['',Validators.email]
  })
  public new_password_form=this.formBuilder.group({
    new_password: ['', Validators.compose([
      Validators.required,
      Validators.pattern(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{4,16}$`)
    ])],
    retype_password:['',Validators.required]
  })
  public otp_form=this.formBuilder.group({
    otp:['',Validators.required]
  })


  public get new_password()   {
    return this.new_password_form.get('new_password')
  }


  public get retype_password()  {
    return this.new_password_form.get('retype_password')
  }


  public get otp()  {
    return this.otp_form.get('otp')
  }


  ngOnInit() {
    if(this.authService.currentUserValue){
      this.email_form.value.email=this.authService.currentUserValue.email;
      this.sendEmail();
    }
  }
  sendEmail(){
    //console.log(this.email_form.value.email);
    this.email_form_loader=true;
    this.authService.sendEmail(this.email_form.value.email).subscribe(
      x=>{
        this.step++;
        //console.log(this.email_form.value.email)
        //this.email_form.value.email=this.authService.currentUserValue.email;
        this.email_form_loader=false;
        this.email_form_error=null
        // if(x["status"]===200){
        //   //console.log(x["message"])
        //   this.step++;
        // }else{
        //   //console.log(x["message"]);
        // }
      },
      error=>{
        this.email_form_error=error.error.message;
        this.email_form_loader=false;
      }
    )
  }

  verifyOtp(){
    //console.log(this.email_form.value.email+" "+ this.otp_form.value.otp);
    this.otp_form_loader=true;
    this.authService.verifyOtp(this.email_form.value.email,this.otp_form.value.otp).subscribe(
      x=>{
        this.step++;
        this.otp_form_loader=false;
        this.email_form_error=null;
        if(x["status"]===200){
          //console.log(x["message"])

        }else{
          //console.log(x["message"])
        }
      },
      error=>{
        this.otp_form_error=error.error.message;
        this.otp_form_loader=false;
      }
    )
  }

  submit(){
    if(this.new_password_form.controls.new_password.value!=this.new_password_form.controls.retype_password.value){
      //console.log(this.new_password_form.value);
    }else{
      this.new_password_form_loader=true;
      //console.log(this.new_password_form.value)
      this.authService.changePassword(this.email_form.value.email,this.otp_form.value.otp,this.new_password_form.value.new_password).subscribe(x=>{
        //console.log(x);
        this.new_password_form_error=null;
        this.new_password_form_loader=false;
        this.router.navigate(['/login'])
      },
      error=>{
        this.email_form_error=error.error.message;
        this.new_password_form_error=null;
      });
    }
  }

  ngOnDestroy(){
    //this.sub.unsubscribe()
  }
}
