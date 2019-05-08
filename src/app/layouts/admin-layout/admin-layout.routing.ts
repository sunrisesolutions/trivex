import { QrCodeComponent } from './../../pages/login/qr-code/qr-code.component';
import { Routes } from '@angular/router';

import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { MemberConnectComponent } from 'src/app/pages/member-connect/member-connect.component';
import { MemberidComponent } from 'src/app/pages/club-members/memberid/memberid.component';
import { QrStartComponent } from '../../pages/qr-start/qr-start.component';
import { QrScannerComponent } from '../../pages/qr-scanner/qr-scanner.component';
import { ConnectComponent } from '../../pages/club-members/connect/connect.component';
import { SendEmailComponent } from '../../pages/club-members/send-email/send-email.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'club-members',   component: ClubMembersComponent },
    { path: 'member-connect',   component: MemberConnectComponent },
    { path: 'club-members/:id/info', component: MemberidComponent },
    { path: 'club-members/:id/connect', component: ConnectComponent },
    { path: 'club-members/individual_members/:id/connect', component: ConnectComponent },
    { path: 'club-members/:id/qr-code', component: QrCodeComponent },
    { path: 'club-members/:id/send-email', component: SendEmailComponent },
    { path: "qr-code", component: QrCodeComponent },
    { path: "qr-start", component: QrStartComponent },
    { path: "qr-scanner", component: QrScannerComponent },
    { path: "dashboard/:access", component: DashboardComponent }
];
