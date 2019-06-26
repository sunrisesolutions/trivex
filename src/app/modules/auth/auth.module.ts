import { LoginComponent } from './../../pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthModule, NbTokenLocalStorage } from '@nebular/auth';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { NbCheckboxModule, NbInputModule, NbAlertModule, NbButtonModule } from '@nebular/theme';
import { NbTokenStorage } from '../../@core/core.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

    NbAuthModule,
  ],
})
export class AuthModule { }
