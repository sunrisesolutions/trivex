import { ActivatedRoute } from '@angular/router';
import { PostService } from './../../services/post.service';
import { Component, OnInit, Directive } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-acccess-token',
  templateUrl: './login-acccess-token.component.html',
  styleUrls: ['./login-acccess-token.component.scss']
})

export class LoginAcccessTokenComponent implements OnInit {
  accessToken: string = '';
  returnUrl: string;

  constructor(public service: PostService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    /* const params = this.route.snapshot.queryParams;
    if (params['redirectUrl']) {
      this.returnUrl = params['redirectUrl'];
    }

    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl)
        .catch(() => this.router.navigate([`club-members`]));
    } else {
      this.router.navigate([`club-members`]);
    } */
  }
  login() {
    const formData = new FormData();
    formData.append('access-token', this.accessToken);
    this.service.loginAccessToken(formData).subscribe(response => {
      const setToken = response['token'];
      const refreshToken = response['refresh_token'];
      const accessToken = response['im_access_token'];
      const imID = response['im_id'];
      // console.log("token", response);
      localStorage.setItem("token", setToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("access_token", accessToken);
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
      this.router.navigate([`club-members`])
      // console.log(decoded.exp);
      //refresh

    });
    /* let id = localStorage.getItem('im_id');
    this.router.navigate([`club-members/${id}/qr-code`]); */
  }
}
