import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errmsgs:string="";
  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required]
    });
    if(this.authservice.currentUser!=null){
      const role:string = this.authservice.currentUserValue.role;
      this.router.navigate(['/' + role]);
    }
  }

public get email()  {
  return this.loginForm.controls.email;
}


public get password()  {
  return this.loginForm.controls.password;
}


  onSubmit() {
    const email: string = this.loginForm.get('email').value;
    const password: string = this.loginForm.get('password').value;
    console.log(this.loginForm.value);
    this.authservice.login(email, password).subscribe(
      user => {
        console.log(user);
        const role: string = user['role'];
        this.router.navigate(['/' + role]);
      },
      error => {
        console.log(error);
        this.errmsgs=error.error.message;
      }
    );
  }

  onChangePassword(){
    console.log("Change Password Clicked")
    this.router.navigate(['/changePassword'])
  }

}
