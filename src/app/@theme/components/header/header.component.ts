import { UserInterface } from './../../../models/users';
import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];



  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private service: ApiService,
    private router: Router,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
    private layoutService: LayoutService) {
    this.authService.onTokenChange()
      .subscribe((token) => {
        if (token.isValid()) {
          localStorage.setItem('token', token['token']) /* SET TOKEN TO LOCAL STORAGE */
          localStorage.setItem('im_id', token['payload'].im) /* SET IM_ID TO LOCAL STORAGE */
          let id = localStorage.getItem("im_id");/* GET IM_ID FROM LOCAL STORAGE */
          id = id.replace(/\D/g, ''); /* Convert im_id */
          this.service.userInfo(id).subscribe(res => {
            this.user = res;
            console.log("info user", res);
          });

        }
      })

  }


  ngOnInit() {

  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
