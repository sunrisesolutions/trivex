import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './../../services/auth.service';
import { QrCodeComponent } from './../../pages/login/qr-code/qr-code.component';
import { Routes, RouterModule } from '@angular/router';

import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { MemberConnectComponent } from 'src/app/pages/member-connect/member-connect.component';
import { MemberidComponent } from 'src/app/pages/club-members/memberid/memberid.component';
import { QrStartComponent } from '../../pages/qr-start/qr-start.component';
import { QrScannerComponent } from '../../pages/qr-scanner/qr-scanner.component';
import { ConnectComponent } from '../../pages/club-members/connect/connect.component';
import { SendEmailComponent } from '../../pages/club-members/send-email/send-email.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { PostAnnouncementComponent } from '../../pages/post-announcement/post-announcement.component';
import { NotificationsComponent } from 'src/app/pages/notifications/notifications.component';
import { DeliveryComponent } from 'src/app/pages/notifications/delivery/delivery.component';
import { queryRefresh } from '@angular/core/src/render3';
import { EventsComponent } from 'src/app/pages/events/events.component';
import { FreeOnMessageComponent } from 'src/app/pages/free-on-message/free-on-message.component';
import {DeliveriesComponent} from '../../pages/notifications/deliveries/deliveries.component';
import {MessageComponent} from '../../pages/notifications/message/message.component';
import {MessageApprovalComponent} from '../../pages/notifications/message-approval/message-approval.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'club-members',
    component: ClubMembersComponent,
  },
  {
    path: 'free-on-delivery',
    component: FreeOnMessageComponent
  },
  { path: 'member-connect', component: MemberConnectComponent },
  { path: 'club-members/:id/info', component: MemberidComponent },
  { path: 'club-members/:id/connect', component: ConnectComponent },
  { path: 'club-members/notifications', component: NotificationsComponent },
  { path: 'club-members/notifications/announcement-approvals', component: MessageApprovalComponent},
  { path: 'club-members/notifications/:status', component: NotificationsComponent },
  { path: 'club-members/notifications/deliveries/:id/selected-option/:selectedOptionUuid', component: DeliveriesComponent},
  { path: 'club-members/notifications/deliveries/:id', component: DeliveryComponent},
  { path: 'club-members/notifications/messages/:id', component: MessageComponent},
  { path: 'club-members/notifications/messages/:id/decide/:decision', component: MessageComponent},
  { path: 'club-members/individual_members/:id/connect', component: ConnectComponent },
  { path: 'club-members/:id/qr-code', component: QrCodeComponent },
  { path: 'club-members/:id/send-email', component: SendEmailComponent },
  { path: "qr-code", component: QrCodeComponent },
  { path: "qr-start", component: QrStartComponent },
  { path: "qr-scanner", component: QrScannerComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "post-announcement", component: PostAnnouncementComponent },
];

