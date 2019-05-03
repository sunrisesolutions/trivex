import { ClubMembersComponent } from './pages/club-members/club-members.component';
import { PostService } from './services/post.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MemberidComponent } from './pages/club-members/memberid/memberid.component';
import { ConnectComponent } from './pages/club-members/connect/connect.component';
import { QrCodeComponent } from './pages/login/qr-code/qr-code.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    MemberidComponent,
    ConnectComponent,
  ],
  providers: [
    PostService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
