import { ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router, private service: PostService,private routes: ActivatedRoute) { }

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    if (window.location.pathname === '/login' && localStorage.getItem('remember')) {
      const getRefToken = localStorage.getItem('remember');
      const formRef = new FormData();
      formRef.append('refresh_token', getRefToken);

      this.service.refreshToken(formRef).subscribe(res => {
        localStorage.setItem('token', res['token']);
        console.log('refreshed', res);
        this.router.navigate(['/club-members'])
      }, error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      });
    }

  }
  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
