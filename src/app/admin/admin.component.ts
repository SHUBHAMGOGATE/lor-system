import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService) { }
  userList = {};
  searchBox = new FormControl('');
  userListFiltered;
  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.userList = res;
        this.userListFiltered = this.searchBox.valueChanges.pipe(
          startWith(''),
          map(text => this.search(res, text))
        );
      }
    );

  }
  search(arr, text) {
    return arr.filter(request => {
      const term = text.toLowerCase();
      return (request.first_name + ' ' + request.last_name).toLowerCase().includes(term)
         || request.email.toString().includes(term) || request.dept.toLowerCase().includes(term);
    });
  }
  removeUser(email) {
    this.userService.deleteUser(email).subscribe(
      result => {
        this.userService.getAllUsers().subscribe(
          res => {
            this.userList = res;
            this.userListFiltered = this.searchBox.valueChanges.pipe(
              startWith(''),
              map(text => this.search(res, text))
            );
          }
        );
      }
    );
  }

}
