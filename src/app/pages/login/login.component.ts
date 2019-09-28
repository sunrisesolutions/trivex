import {AttendeeService} from './../../services/attendee.service';
import {AdminLayoutRoutes} from './../../layouts/admin-layout/admin-layout.routing';
import {Observable} from 'rxjs';
import {PostService} from './../../services/post.service';
import {Http} from '@angular/http';
import {AuthService} from './../../services/auth.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  ElementRef
} from '@angular/core';
import {Router} from '@angular/router';
import {NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as jwt_decode from 'jwt-decode';
import {getLocaleDateTimeFormat} from '@angular/common';
import {decode} from '@angular/router/src/url_tree';
import {toBase64String} from '@angular/compiler/src/output/source_map';
import {SettokenService} from 'src/app/services/settoken.service';
import {error} from '@angular/compiler/src/util';
import {Routes} from '@angular/router';
import {delay, timeout} from 'q';
import {ActivatedRoute} from '@angular/router';
import {PushNotificationService} from 'src/app/services/post-notif.service';
import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // value formdata
  orgCode;
  phone;
  idNumber;
  id;
  date = {
    year: 0,
    month: 0,
    day: 0
  };
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
  error = '';
  notEnoughOld = '';
  showOrg: boolean = false;

  constructor(
    private router: Router,
    private service: PostService,
    private attendeesService: AttendeeService,
    private http: Http,
    private serviceToken: SettokenService,
    private route: ActivatedRoute,
  ) {
    this.date.year = new Date().getFullYear();
  }

  ngOnInit() {

    this.getSubdomain();
    if (!this.showOrg) {
      this.getOrganisationCode();
    }

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
      console.log('should be redirecting here to ', this.returnUrl);
      this.router.navigateByUrl(this.returnUrl)
        .catch(() => this.router.navigate([`dashboard`]));
      console.log('done redirecting');
    } else {
      this.router.navigate([`dashboard`]);
    }

    this.getLogoOrganisation();

  }

  getSubdomain() {
    var host = window.location.hostname;
    var parts = host.split('.');
    console.log(parts);
    if (parts.length >= 2) {
      if (parts[0] === 'www') {
        this.showOrg = true;
      } else {
        this.sub = parts[0];
        if (this.sub === 'whatwechat' && host !== 'whatwechat.whatwechat.net') {
          this.showOrg = true;
        } else {
          this.showOrg = false;
        }
      }
    } else if (parts.length === 1) {
      this.showOrg = true;
    }
  }

  @ViewChild('dobi') dobi: ElementRef;

  login() {
    // const inputDob = new Date(`${this.dob.day}-${this.dob.month}-${this.dob.year}`).toLocaleDateString();
    const formData = new FormData();
    // (this.showOrg) ? this.orgCode : this.sub)
    formData.append('org-code', this.orgCode);
    formData.append('phone', this.phone);
    formData.append('id-number', this.idNumber);
    formData.append('birth-date', this.dobi.nativeElement.value);

    // const formRef = new FormData();
    this.loading = true;
    this.service.postFormData(formData).subscribe(response => {
      let setToken = response['token'];
      let refreshToken = response['refresh_token'];
      let accessToken = response['im_access_token'];
      let imID = response['im_id'];
      this.loading = false;
      // console.log("token", response);
      localStorage.setItem('im_id', imID);
      localStorage.setItem('token', setToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('access_token', accessToken);
      let id = response['im_id'];
      // console.log(accessToken);
      // decoded
      let token = setToken;
      let decoded = jwt_decode(token);
      // console.log(decoded.exp);
      //refresh
      this.router.navigateByUrl(this.returnUrl);
      if (this.remStatus === true) {
        localStorage.setItem('remember', refreshToken);
      }
    }, error => {
      if (error.status === 401 || error.status === 500) {
        alert('Something went wrong!!!');
      }
      this.loading = false;
    });
    /* let id = localStorage.getItem('im_id');
    this.router.navigate([`club-members/${id}/qr-code`]); */
  }

  checkTime(dob) {
    if (dob) {
      if (this.date.year - dob.year < 18) {
        this.notEnoughOld = 'You must be over 18 years old';
      } else {
        this.loading = true;
        this.login();
      }
    }
  }

  /* LOGIN BY SUBDOMAIN */
  getLogoOrganisation() {
    if (!this.showOrg) {
      this.service.getLogoFilter(this.sub)
        .subscribe(res => {
          console.log('logo', res);
          this.orgLogo = res['logoReadUrl'];
          /* Dynamic Manifest */
          let paramsDataManifest = {
            logo: this.orgLogo,
            name: this.sub,
            host: document.location.host
          };

          this.createManifestUrl(paramsDataManifest);
          /* check server image */
          this.http.get(this.orgLogo)
            .subscribe(res => {

            }, err => {
              if (err.status === 404) {
                this.orgLogo = '/assets/img-process/Not-found-img.gif';
                paramsDataManifest.logo = this.orgLogo;
                this.createManifestUrl(paramsDataManifest);
              }
            });
        }, error => {
          if (error.status === 404) {
            this.orgLogo = './assets/img-process/Not-found-img.gif';
            // this.error = 'Organisation not found'
          }
          if (error.status === 500) {
            this.error = error.error.message;
          }
        });
    }

  }
  // data['logo']
  createManifestUrl(data) {
    var myDynamicManifest = {
      'name': data['name'].toUpperCase() + ' WEB APP',
      'short_name': data['name'].toLowerCase(),
      'display': 'fullscreen',
      'start_url': 'https://' + data['host'],
      'background_color': '#000000',
      'theme_color': '#0f4a73',
      'icons': [{
        'src': 'https://www.whatwechat.net/assets/icons/t-logo-192.png',
        "sizes": "192x192",
        'type': 'image/png'
      }]
    };
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], {type: 'application/json'});
    const manifestURL = URL.createObjectURL(blob);
    document.querySelector('#org-manifest').setAttribute('href', manifestURL);
  }

  /* LOGIN BY SUBDOMAIN */
  getOrganisationCode() {
    this.service.getOrganisationCodeBySubdomain(this.sub)
      .subscribe(res => {
        console.log('code', res);
        this.orgCode = res['organisationCode'];
      });
  }
}
