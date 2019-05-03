import { QrCodeComponent } from './../../pages/login/qr-code/qr-code.component';
import { Routes } from '@angular/router';

import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { MemberConnectComponent } from 'src/app/pages/member-connect/member-connect.component';
import { MemberidComponent } from 'src/app/pages/club-members/memberid/memberid.component';
import { QrStartComponent } from '../../pages/qr-start/qr-start.component';
import { QrScannerComponent } from '../../pages/qr-scanner/qr-scanner.component';
import { ConnectComponent } from '../../pages/club-members/connect/connect.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'club-members',   component: ClubMembersComponent },
    { path: 'member-connect',   component: MemberConnectComponent },
    { path: 'club-members/:name/:id/info', component: MemberidComponent },
    { path: 'club-members/:name/:id/connect', component: ConnectComponent },
    { path: 'club-members/:id/qr-code', component: QrCodeComponent },
    { path: "qr-code", component: QrCodeComponent },
    { path: "qr-start", component: QrStartComponent },
    { path: "qr-scanner", component: QrScannerComponent }
];
