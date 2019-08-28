import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CheckRoleService } from '../../services/check-role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  access_token;
  qrLink;
  isAdmin: boolean = false;
  isMessage: boolean = false;
  isQrCode: boolean = false;
  isUser: boolean = false;

  decoded = jwt_decode(localStorage.getItem('token'))
  constructor(
    private router: Router,
    private service: PostService,
    private route: ActivatedRoute,
    public roleChecker: CheckRoleService
  ) {

  }

  ngOnInit() {
    this.checkingRole();
    // let snapAT = this.route.snapshot.paramMap.get('access')
    // console.log(snapAT)
    // this.access_token = localStorage.getItem("access_token");
    // let accessTok = new FormData();
    // accessTok.append("access-token", `${snapAT}`);
    //
    // this.qrLink = `https://qrcode.magentapulse.com/qr-code/https://www.trivesg.com/dashboard/${snapAT}.png`;
    //
    //
    // if (snapAT == this.access_token) {
    //   localStorage.clear();
    //   this.router.navigate(['/login'])
    // } else {
    //   this.service.loginByAccessToken(accessTok).subscribe(res => {
    //     console.log(res);
    //   });
    // }
  }

  checkingRole() {

    if (this.roleChecker.ROLE_EVENT_ADMIN || this.roleChecker.ROLE_ORG_ADMIN) {
      this.service.G_OrgByUuid(this.decoded.org)
        .subscribe(res => {
          if (res['hydra:member'][0].eventEnabled) {
            return this.isAdmin = true;
          }
        })
    } else {
      if (this.roleChecker.ROLE_USER) {
        this.isUser = true;
        this.service.getMessage(1, '')
          .subscribe(res => {
            if (res['hydra:totalItems'] > 0) {
              this.isMessage = true;
            } else {
              this.isQrCode = true;
            }
          })
      }
    }

  }
}
