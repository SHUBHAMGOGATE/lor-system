import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { StudentRequestStatusComponent } from './student-request-status/student-request-status.component';
import { RequestDataTableComponent } from './request-data-table/request-data-table.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'changeEmail',
    component: ChangeEmailComponent
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
      {path: '' , component: RequestFormComponent},
      {path: 'request', component: RequestFormComponent},
      {path: 'status' , component: StudentRequestStatusComponent},
      {path: 'profile', component: ProfileViewComponent}
    ]
  },
  {
    path: 'tpo',
    component: HomeComponent,
    children: [
      {path: '' , component: RequestDataTableComponent},
      {path: 'request', component: RequestDataTableComponent},
      {path: 'profile', component: ProfileViewComponent}
    ]
  },
  {
    path: 'hod',
    component: HomeComponent,
    children: [
      {path: '' , component: RequestDataTableComponent},
      {path: 'request', component: RequestDataTableComponent},
      {path: 'profile', component: ProfileViewComponent},
      {path: 'analytics', component: AnalyticsComponent},
      {path: 'analytics/:year', component: AnalyticsComponent},
      {path: 'analytics/:year/:branch', component: AnalyticsComponent},
      {path: 'analytics/:year/:branch/:professor', component: AnalyticsComponent},
      // {path: 'documents',component:DocumentUploadComponent}
    ]
  },
  {
    path: 'teacher',
    component: HomeComponent,
    children: [
      {path: '' , component: RequestDataTableComponent},
      {path: 'request', component: RequestDataTableComponent},
      {path: 'profile', component: ProfileViewComponent},

      // {path: 'documents',component:DocumentUploadComponent}
    ]
  },
  {
    path: 'admin',
    component: HomeComponent,
    children: [
      {path: 'userRemove', component: AdminComponent},
      {path: 'userAdd', component: RegisterComponent},
      {path: 'profile', component: ProfileViewComponent},
      {path: 'analytics', component: AnalyticsComponent},
      {path: 'analytics/:year', component: AnalyticsComponent},
      {path: 'analytics/:year/:branch', component: AnalyticsComponent},
      {path: 'analytics/:year/:branch/:professor', component: AnalyticsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
