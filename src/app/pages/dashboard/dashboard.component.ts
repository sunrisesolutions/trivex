import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { Router } from "@angular/router";
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  access_token;
  qrLink;
  constructor(
    private router: Router,
    private service: PostService,
    private route: ActivatedRoute) {
      
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
  checkingRole(){
    let decoded = jwt_decode(localStorage.getItem('token'));
    let role = decoded.roles;
    if(role.indexOf('ROLE_EVENT_ADMIN') > -1){
      return true;
    }
  }
}
