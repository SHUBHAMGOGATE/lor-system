import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router,private authService:AuthService) { }
  public status: boolean;
  public navInfo: any = [
    {
      role: 'student',
      links: [
        {tag: 'NEW REQUEST', link: './request'},
        {tag: 'View Requests Status', link: './status'},
        {tag: 'View Profile', link: './profile'}
      ]
    },
    {
      role: 'hod',
      links: [
        {tag: 'Lor requests', link: './request'},
        {tag: 'View Profile', link: './profile'},
        {tag: 'Upload/Download LOR Format', link:'./documents'}
      ]
    },
    {
      role: 'tpo',
      links: [
        {tag: 'Lor requests', link: './request'},
        {tag: 'View Profile', link: './profile'},
      ]
    },
    {
      role: 'teacher',
      links: [
        {tag: 'Lor requests', link: './request'},
        {tag: 'View Profile', link: './profile'},
        {tag: 'Upload/Download LOR Format', link:'./documents'}
      ]
    }
  ];
  public navLinks: any;
  public isCollapsed=false;
  ngOnInit() {
    this.status = false;
    console.log(this.router.url.split('/')[1]);
    this.navLinks = this.navInfo.find(element => {
      return element.role === this.router.url.split('/')[1];
    });
    console.log(this.navLinks);
  }
  clickEvent(event) {
    this.status = ! this.status;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
