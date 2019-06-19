import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, public router: Router, ) { }
  public registerForm: FormGroup;
  public otp:FormControl
  public step;
  ngOnInit() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      uid:['',Validators.required],
      email: ['', Validators.required],
      contact: ['',Validators.required],
      password: ['', Validators.required],
      retype_password: ['', Validators.required],
      role: ['', Validators.required],
      dept: ['', Validators.required]
    });
    this.otp=new FormControl('',Validators.compose([Validators.minLength(6),Validators.maxLength(6)]))
    this.step=0;
  }

  sendMail(){
    this.userService.verifyEmail(this.registerForm.value.email).subscribe(
      x=>{
        console.log(x);
        this.step++;
      }
    );
  }
  verifyOtp(){
    this.userService.verifyOtp(this.email.value,this.otp.value).subscribe(
      x=>{
        console.log(x);
        this.step++;
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
    console.log(this.registerForm);
    this.userService.registerUser(this.registerForm.value).subscribe(
      x => {
        console.log(x);
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
