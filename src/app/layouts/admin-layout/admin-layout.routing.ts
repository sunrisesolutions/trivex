import { Routes } from '@angular/router';

import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { MemberConnectComponent } from 'src/app/pages/member-connect/member-connect.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'club-members',   component: ClubMembersComponent },
    { path: 'member-connect',   component: MemberConnectComponent }
];
