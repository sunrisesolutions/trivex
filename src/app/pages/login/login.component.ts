import { InputData } from './../../services/inputdata';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PostService } from './../../services/post.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy, ViewChild, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as jwt_decode from "jwt-decode";
import { getLocaleDateTimeFormat } from '@angular/common';
import { decode } from '@angular/router/src/url_tree';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { SettokenService } from 'src/app/services/settoken.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // value formdata
  orgCode;
  phone;
  idNumber;
  // 
  dob: NgbDate;
  posts: any[];
  invalidLogin: boolean;
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

  @ViewChild('dobi') dobi: ElementRef;

  login() {
    const inputDob = this.dobi.nativeElement.value
    const formData = new FormData();
    formData.append('org-code', this.orgCode);
    formData.append('phone', this.phone);
    formData.append('id-number', this.idNumber);
    formData.append('birth-date', inputDob);
    const formRef = new FormData();

    this.service.postFormData(formData)
      .subscribe(response => {
        console.log("token", response.json());
        localStorage.setItem('token', response.json().token)
        // decoded
        let token = response.json().token;
        let decoded = jwt_decode(token);
        console.log(decoded);
        //refresh
        let date = ~~(Date.now() / 1000);
        console.log(date);
        formRef.append('refresh_token', response.json().refresh_token);
        if (decoded.exp < date) {
          this.service.refreshToken(formRef)
            .subscribe(response => {
              localStorage.setItem('token', response.json().token)
              console.log("token_refreshed", response.json());
            })
        }
        else{
          console.log("token còn mới");
        }
        // co token thi ....
        if (token) {
          this.router.navigate(['/club-members']);
        }
      })
  }
}
