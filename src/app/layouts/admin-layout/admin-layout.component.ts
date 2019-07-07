import { Http } from '@angular/http';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { DeviceDetectorModule, DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})

export class AdminLayoutComponent implements OnInit {

  constructor(private service: PostService, private router: Router) {
  }
  ngOnInit() {
    setInterval(() => {
      this.AccessToken();
    }, 2000);

  }
  AccessToken() {
    // lấy token
    const getToken = localStorage.getItem('token');
    const token = getToken;
    // lấy refresh token
    const getRefToken = localStorage.getItem('refresh_token');
    const formRef = new FormData();
    formRef.append('refresh_token', getRefToken);
    // decode token lấy timestamp
    const decoded = jwt_decode(token);
    const currentDate = Date.now();
    const tokenDate = decoded.exp * 1000;
    if (tokenDate < currentDate) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else if (localStorage.getItem('token')) {

      /*nếu tokendate trừ cho currentdate nhỏ hơn 600000 thì thực hiện refresh*/
      if (tokenDate - currentDate < 600000) {
        if (localStorage.getItem('refresh_token')) {
          this.service.refreshToken(formRef).subscribe(res => {
            localStorage.setItem('token', res['token']);
            console.log('refreshed', res);
          }, error => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            }
          });
        } else {
          this.router.navigate(['/login']);
        }

      }
      /* console.log(
        "2 thoi gian tru cho nhau (sau): ",
        tokenDate - currentDate
      ); */
    }
  }

  /* /.Device detector */
}
