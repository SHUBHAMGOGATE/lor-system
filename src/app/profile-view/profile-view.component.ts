import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public user:Observable<any>;
  constructor(private userService:UserService,private fb:FormBuilder,private authService:AuthService,private router:Router,private route:ActivatedRoute) {

   }
  user_form:FormGroup;
  ngOnInit() {
    this.user_form=this.fb.group({
      first_name:[''],
      last_name:[''],
      contact:['']
    })

    this. user=this.userService.getUser().pipe(map(x=>{
      console.log(x)
      this.user_form.patchValue({
        first_name:x['first_name'],
        last_name:x['last_name'],
        contact:x['contact']
      })

      return x
    }))
  }
  onSubmit(){
    console.log(this.user_form.value);
    this.userService.updateUser(this.user_form.value).subscribe(
      x=>{
        this.router.navigate(['./']);
        console.log(x);
      }
    )
  }
  changePassword(){
    this.router.navigate(['changePassword']);
  }
  changeEmail(){
    this.router.navigate(['changeEmail']);
  }
}
