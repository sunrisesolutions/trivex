import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { MemberConnectComponent } from 'src/app/pages/member-connect/member-connect.component';
import { MemberidComponent } from 'src/app/pages/club-members/memberid/memberid.component';
import { QrCodeComponent } from 'src/app/pages/login/qr-code/qr-code.component';
import { QrScannerComponent } from '../../pages/qr-scanner/qr-scanner.component';
import { QrStartComponent } from '../../pages/qr-start/qr-start.component';
import { JobComponent } from '../../components/job/job.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ConnectComponent } from '../../pages/club-members/connect/connect.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ZXingScannerModule.forRoot()
  ],
  declarations: [
    ClubMembersComponent,
    MemberConnectComponent,
    QrScannerComponent,
    QrCodeComponent,
    QrStartComponent,
    JobComponent,
    MemberidComponent,
    ConnectComponent,
  ]
})

export class AdminLayoutModule {}
