import { InputData } from './../../services/inputdata';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PostService } from './../../services/post.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as jwt_decode from "jwt-decode";
import { getLocaleDateTimeFormat } from '@angular/common';
import { decode } from '@angular/router/src/url_tree';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { SettokenService } from 'src/app/services/settoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  dob: NgbDate;
  posts: any[];
  constructor(
    private router: Router,
    private service: PostService,
    private http: Http,
    private serviceToken: SettokenService
  ) {

  }

  ngOnInit() {

  }
  ngOnDestroy() {
  }


  login() {
    const formData = new FormData();
    formData.append('org-code', 'magenta');
    formData.append('phone', '84834567247');
    formData.append('id-number', '024290123');
    formData.append('birth-date', '1987-10-04');
    this.service.postFormData(formData)
      .subscribe(response => {
        console.log(response.json());
      })
    /* this.router.navigate(['/']); */
    this.serviceToken.setTok;
    this.serviceToken.setRefTok ;
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTY0NTkzMTEsImV4cCI6MTU1NjQ2MjkxMSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInV1aWQiOiJVU0VSLTVjYzNjMGJhMDBmMzktMTAzODI3MDQyMDE5IiwiaXAiOiIxMTMuMTcyLjE2OS42NCIsIm9yZyI6Ik9SRy1tYWdlbnRhIn0.csKlWue_u7m55n8Cf_QFHPyKAPQJglz4yRJ6V9zz8wm-vqNQGTlNaM4WnoJIuWW5_Ab9zsrwEPRmxaPv52xKIQAv4TCroZ-t6vE2xGS46cB4j_5yjcCPC4iX-10t2kulUCCWXifXrpVzOnkLm9hO4jb2Bce7NndYyfzliwY5KxSi7c2KxD7cqdaIxpxHpoE-g14imgsjK2afCvxMwSdtRJtasCUqFCgaBRyJAFoiPQmVkKSr50StqdUjOpBSsQ1XsYoA0_9W4d-VBGG1ocpwOJoeSm5WohgSaybJlXmcOvp105C-WDE0IAkSbiOBqi3AFi9n9fYTkOGcQJceMxS25FkmYLkIv5JiqAKt35MMGt0aLL32LZflKIWuflSrahurtzpmfnobP2sc15tMJiuCG44yAZH3rhfWrzlX3_ubWd40W8SH6kKBQQq0vHM3YPv-YPHMlCOLcY1DFCaeUgDEcOeluI9N9tQai2S9VjO0C_RMGaSBkDuC3kUjh4KTU1rk-mHnjg8Wcw36X-UHG-AlQtfzzKhx5ynv6mvBxLxAsnzLVEYWsGZP02P1tEdTLspd-58GhzDNuoFhB3HkUsuG5k4nU_PkEEVh9Mzvct4QCo187VQQr-v-t72YqQB5lt3ObpLIMInLJ8xOW_1zZya3XXC5kJExa-3bzvaroQtQvrw";
    let decoded = jwt_decode(token);
    console.log(decoded);
    // Date -> timestamp
    let date = ~~(Date.now() / 1000);
    if (decoded.exp < date) {
      console.log(decoded.exp < date)
      console.log(decoded.exp + ' < ' + date)
    }
    else {
      console.log(decoded.exp > date)
    }

  }
}
