import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, public router: Router,public route: ActivatedRoute ) { }
  public registerForm: FormGroup;
  public otp:FormControl
  public step;
  public url;
  public otpErrorMessage;
  public registerErrorMessage;
  ngOnInit() {
    this.route.url.subscribe(
      x=>{
        this.url=x[0].path;
        this.url;
      }
    );
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      uid:[0],
      email: ['', Validators.compose([ Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")])],
      contact: ['',Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{4,16}$`)
      ])],
      retype_password: ['', Validators.required],
      //Password expresion that requires one lower case letter, one upper case letter, one digit, 6-3 length, and no spaces
      role: ['', Validators.required],
      dept: ['']
    });
    this.otp=new FormControl('',Validators.compose([Validators.minLength(6),Validators.maxLength(6)]))
    this.step=0;
  }

  sendMail(){
    this.userService.verifyEmail(this.registerForm.value.email).subscribe(
      x=>{
        //console.log(x);
        this.step++;
      }
    );
  }
  verifyOtp(){
    this.userService.verifyOtp(this.email.value,this.otp.value).subscribe(
      x=>{
        //console.log(x);
        this.step++;
        this.otpErrorMessage=null;
      },
      err=>{
        this.otpErrorMessage=err.error.message;
      }
    )
  }
  back(){
    this.step--;
  }
  public get first_name() {
    return this.registerForm.get('first_name');
  }
  public get last_name() {
    return this.registerForm.get('last_name');
  }

  public get email()  {
    return this.registerForm.get('email');
  }
  public get contact()  {
    return this.registerForm.get('contact');
  }
  public get uid()  {
    return this.registerForm.get('uid');
  }

  public get password()  {
    return this.registerForm.get('password');
  }
  public get retype_password()  {
    return this.registerForm.get('retype_password');
  }
  public get role()  {
    return this.registerForm.get('role');
  }
  public get dept()  {
    return this.registerForm.get('dept');
  }

  onSubmit() {
    //console.log(this.registerForm.value)
    if(this.role.value!=0 || (this.role.value==0 && this.uid.value!=0)){
    let temp=this.registerForm.value;
    temp["key"]=this.otp.value
    //console.log(this.registerForm);
    this.userService.registerUser(this.registerForm.value).subscribe(
      x => {
        //console.log(x);
        this.router.navigate(['/login']);
      },
      err => {
        this.registerErrorMessage=err.error.message;
        //console.log(err);
      }
    );
    }
  }
}
