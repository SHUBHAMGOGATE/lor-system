import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { StudentRequestStatusComponent } from './student-request-status/student-request-status.component';
import { RequestModalComponent } from './request-modal/request-modal.component';
import { RequestDataTableComponent } from './request-data-table/request-data-table.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { RejectModalComponent } from './reject-modal/reject-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RequestFormComponent,
    StudentRequestStatusComponent,
    RequestModalComponent,
    RequestDataTableComponent,
    ProfileViewComponent,
    RejectModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[RequestModalComponent,RejectModalComponent]
})
export class AppModule { }
