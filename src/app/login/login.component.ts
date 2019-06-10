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

  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;
    console.log(this.loginForm.value);
    this.authservice.login(username, password).subscribe(
      user => {
        console.log(user);
        const role: string = user['role'];
        this.router.navigate(['/' + role]);
      },
      error => {
        console.log(error);
      }
    );
  }

}
