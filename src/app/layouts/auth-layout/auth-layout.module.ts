import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { RegisterEventComponent } from '../../pages/register-event/register-event.component';
import { EventLoginMember } from 'src/app/pages/register-event/login-member/login-member.component';
import { LoginAcccessTokenComponent } from 'src/app/pages/login-acccess-token/login-acccess-token.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,

  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginAcccessTokenComponent,
    RegisterEventComponent,
    EventLoginMember
  ]
})
export class AuthLayoutModule { }
