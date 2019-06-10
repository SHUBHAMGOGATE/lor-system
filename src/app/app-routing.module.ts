import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { StudentRequestStatusComponent } from './student-request-status/student-request-status.component';
import { RequestDataTableComponent } from './request-data-table/request-data-table.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'student',
    component: HomeComponent,
    children: [
      {path: 'request', component: RequestFormComponent},
      {path: 'status' , component:StudentRequestStatusComponent},
      {path: 'profile', component:ProfileViewComponent}
    ]
  },
  {
    path: 'tpo',
    component: HomeComponent,
    children: [
      {path: 'request', component: RequestDataTableComponent},
      {path: 'profile', component:ProfileViewComponent}
    ]
  },
  {
    path: 'hod',
    component: HomeComponent,
    children: [
      {path: 'request', component: RequestDataTableComponent},
      {path: 'profile', component:ProfileViewComponent}
    ]
  },
  {
    path: 'teacher',
    component: HomeComponent,
    children: [
      {path: 'request', component: RequestDataTableComponent},
      {path: 'profile', component:ProfileViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
