import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {PostService} from 'src/app/services/post.service';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {CheckRoleService} from '../../services/check-role.service';
import * as jwt_decoded from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  access_token;
  qrLink;

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

  checkingRole(adminOnly = false): boolean {
    // let decoded =  jwt_decoded(localStorage.getItem('token'));
    // let roles =  decoded.roles;
    // console.log(roles, 'hey',this.roleChecker.ROLE_EVENT_ADMIN);
    if (this.roleChecker.ROLE_EVENT_ADMIN) {
      return true;
    } else if (this.roleChecker.ROLE_ORG_ADMIN) {
      return true;
    } else {
      return false;
    }

  }
}
