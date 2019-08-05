import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './services/post-notif.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { PostService } from './services/post.service';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

const VAPID_SERVER_KEY = "BKNj-ROJiHb7ccxeZ4NjaGnyCa4EtLRXz2N0zNcWQZVm6fTJYTKdBqLJkmQD8tTITzPRP59TEdj7SxRVprkrYVA"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  location: Location;

  constructor(
    public service: PostService,
    public router: Router
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('token');
    console.log(accessToken)
    if (accessToken) {
      if (accessToken === '') {
        this.router.navigate(['/login']);
      } else {
        localStorage.clear();
        this.accessTokenLogin(accessToken);

      }
    }
  }

  ngOnInit() {
    if (environment.production) {
      if (!location.protocol.startsWith("https")) {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }
  accessTokenLogin(accessToken) {
    const formData = new FormData();
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirectUrl');
    formData.append('access-token', accessToken);
    this.service.loginAccessToken(formData).subscribe(response => {
      const setToken = response['token'];
      const refreshToken = response['refresh_token'];
      const accessToken = response['im_access_token'];
      const imID = response['im_id'];
      // console.log("token", response);
      localStorage.setItem("token", setToken);
      localStorage.setItem("refresh_token", refreshToken);
      // localStorage.setItem("access_token", accessToken);
      const id = response['im_id'];
      // console.log(accessToken);
      // decoded
      const token = setToken;
      const decoded = jwt_decode(token);
      this.service.getUserByuuid(decoded.im)
        .subscribe(res => {
          console.log(res);
          let imId = res['hydra:member'][0]['@id'];
          localStorage.setItem('im_id', imId);
        })
      if (redirectUrl) {
        this.router.navigate([`${redirectUrl}`], { queryParams: { token: accessToken } });
      }
      // console.log(decoded.exp);
      //refresh

    }, err => {
      this.router.navigate(['/login']);
    });
    /* let id = localStorage.getItem('im_id');
    this.router.navigate([`club-members/${id}/qr-code`]); */
  }

}
