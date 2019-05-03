import { Routes } from '@angular/router';

import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { MemberConnectComponent } from 'src/app/pages/member-connect/member-connect.component';
import { MemberidComponent } from 'src/app/pages/club-members/memberid/memberid.component';
import { QrCodeComponent } from 'src/app/pages/login/qr-code/qr-code.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'club-members',   component: ClubMembersComponent },
    { path: 'member-connect',   component: MemberConnectComponent },
    { path: 'club-members/:name/:id/qr-code',   component: QrCodeComponent }
];
