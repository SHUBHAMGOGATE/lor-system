import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
