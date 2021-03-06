import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule, NgbTimepicker, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { MemberConnectComponent } from 'src/app/pages/member-connect/member-connect.component';
import { MemberidComponent } from 'src/app/pages/club-members/memberid/memberid.component';
import { QrCodeComponent } from 'src/app/pages/login/qr-code/qr-code.component';
import { QrScannerComponent } from '../../pages/qr-scanner/qr-scanner.component';
import { QrStartComponent } from '../../pages/qr-start/qr-start.component';
import { JobComponent } from '../../components/job/job.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ConnectComponent } from '../../pages/club-members/connect/connect.component';
import { SendEmailComponent } from '../../pages/club-members/send-email/send-email.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { PostAnnouncementComponent } from '../../pages/post-announcement/post-announcement.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component'
import { DeliveryComponent } from '../../pages/notifications/delivery/delivery.component';
import { InfiniteScrollerDirective } from 'src/app/services/infinite-scroller.directive';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { EventsComponent } from 'src/app/pages/events/events.component';
import { FreeOnMessageComponent } from 'src/app/pages/free-on-message/free-on-message.component';
import { BrowserModule } from '@angular/platform-browser';
import { DragToSelectModule } from 'ngx-drag-to-select';
import {DeliveriesComponent} from '../../pages/notifications/deliveries/deliveries.component';
import {MessageComponent} from '../../pages/notifications/message/message.component';
import {MessageApprovalComponent} from '../../pages/notifications/message-approval/message-approval.component';
import { AttendeesComponent } from '../../pages/events/attendees/attendees.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbTimepickerModule,
    ClipboardModule,
    SelectDropDownModule,
    AmazingTimePickerModule,
    ZXingScannerModule.forRoot(),
    AngularEditorModule,
    DragToSelectModule.forRoot()
  ],
  declarations: [
    InfiniteScrollerDirective,
    ClubMembersComponent,
    MemberConnectComponent,
    QrScannerComponent,
    EventsComponent,
    QrCodeComponent,
    QrStartComponent,
    JobComponent,
    MemberidComponent,
    ConnectComponent,
    SendEmailComponent,
    DashboardComponent,
    PostAnnouncementComponent,
    NotificationsComponent,
    AttendeesComponent,
    FreeOnMessageComponent,
    MessageComponent,
    MessageApprovalComponent,
    DeliveryComponent,
    DeliveriesComponent,
  ]
})

export class AdminLayoutModule { }
