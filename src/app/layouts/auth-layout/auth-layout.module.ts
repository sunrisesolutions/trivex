import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrScannerComponent } from '../../pages/qr-scanner/qr-scanner.component';
import { QrCodeComponent } from '../../pages/qr-code/qr-code.component';
import { QrStartComponent } from '../../pages/qr-start/qr-start.component';
import { JobComponent } from '../../components/job/job.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgbModule,
    ZXingScannerModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    QrScannerComponent,
    QrCodeComponent,
    QrStartComponent,
    JobComponent
  ]
})
export class AuthLayoutModule { }
