import { AttendeeService } from "./../../services/attendee.service";
import { AdminLayoutRoutes } from "./../../layouts/admin-layout/admin-layout.routing";
import { Observable } from "rxjs";
import { PostService } from "./../../services/post.service";
import { Http } from "@angular/http";
import { AuthService } from "./../../services/auth.service";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  ElementRef
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import * as jwt_decode from "jwt-decode";
import { getLocaleDateTimeFormat } from "@angular/common";
import { decode } from "@angular/router/src/url_tree";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { SettokenService } from "src/app/services/settoken.service";
import { error } from "@angular/compiler/src/util";
import { Routes } from "@angular/router";
import { delay, timeout } from "q";
import { ActivatedRoute } from '@angular/router';
import { PushNotificationService } from "src/app/services/post-notif.service";
import { SwPush } from "@angular/service-worker";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  // value formdata
  orgCode;
  phone;
  idNumber;
  id;
  toQr;
  sub = null;
  orgLogo = 'https://i.ya-webdesign.com/images/peach-svg-animated-6.gif';
  //
  remStatus: boolean = false;
  dob: NgbDate;
  posts: any[];
  invalidLogin: boolean;
  returnUrl: string;
  loading: boolean;
  constructor(
    private router: Router,
    private service: PostService,
    private attendeesService: AttendeeService,
    private http: Http,
    private serviceToken: SettokenService,
    private route: ActivatedRoute,

  ) {

  }
  ngOnInit() {
    this.getSubdomain();
    // this.service.getDataAPI().subscribe(res => {
    //   let get = res.json()["hydra:member"]["0"]["@id"];
    //   this.id = get;
    // });
    let id = localStorage.getItem('im_id');
    let params = this.route.snapshot.queryParams;
    if (params['redirectUrl']) {
      this.returnUrl = params['redirectUrl'];
    }

    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl)
        .catch(() => this.router.navigate([`club-members`]))
    } else {
      this.router.navigate([`club-members`])
    }

    this.getLogoOrganisation();
  }

  getSubdomain() {
    var host = window.location.hostname;
    var parts = host.split('.trivesg');
    this.sub = parts[0];

    return console.log(parts[0]);
  }

  @ViewChild("dobi") dobi: ElementRef;
  login() {
    const inputDob = this.dobi.nativeElement.value;
    const formData = new FormData();
    formData.append("org-code", (this.sub !== 'trivesg.com') ? this.sub : this.orgCode);
    formData.append("phone", this.phone);
    formData.append("id-number", this.idNumber);
    formData.append("birth-date", inputDob);
    const formRef = new FormData();
    this.loading = true;
    this.service.postFormData(formData).subscribe(response => {
      let setToken = response['token'];
      let refreshToken = response['refresh_token'];
      let accessToken = response['im_access_token'];
      let imID = response['im_id'];
      // console.log("token", response);
      localStorage.setItem("im_id", imID);
      localStorage.setItem("token", setToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("access_token", accessToken);
      let id = response['im_id'];
      // console.log(accessToken);
      // decoded
      let token = setToken;
      let decoded = jwt_decode(token);
      // console.log(decoded.exp);
      //refresh
      this.router.navigateByUrl(this.returnUrl)
      if (this.remStatus === true) {
        localStorage.setItem("remember", refreshToken);
      }
    }, error => {
      if (error.status === 401 || error.status === 500) {
        alert('Something went wrong!!!');
        this.loading = false;
      }
    });
    /* let id = localStorage.getItem('im_id');
    this.router.navigate([`club-members/${id}/qr-code`]); */
  }



  /* LOGIN BY SUBDOMAIN */
  getLogoOrganisation() {
    if (this.sub && this.sub !== 'localhost' && this.sub !== 'trivesg') {
      this.service.getLogoFilter(this.sub)
        .subscribe(res => {
          // console.log('logo', res)
          this.orgLogo = res['logoReadUrl'];
        });
    }
  }
  /* /.LOGIN BY SUBDOMAIN */
}
