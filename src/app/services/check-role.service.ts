import {Injectable} from '@angular/core';
import * as jwt_decoded from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleService {
  ROLE_EVENT_ADMIN = false;
  ROLE_MSG_USER = false;
  ROLE_MSG_ADMIN = false;
  ROLE_ORG_ADMIN = false;

  constructor(public router: Router) {
    this.checkRole();
  }

  async checkRole() {
    let decoded = await jwt_decoded(localStorage.getItem('token'));
    let roles = await decoded.roles;
    console.log('roles', roles);
    if (roles) {
      if (roles.indexOf('ROLE_ORG_ADMIN') > -1) {
        this.ROLE_ORG_ADMIN = true;
      }
      if (roles.indexOf('ROLE_MSG_USER') > -1) {
         this.ROLE_MSG_USER = true;
      }
      if (roles.indexOf('ROLE_MSG_ADMIN') > -1) {
         this.ROLE_MSG_ADMIN = true;
      }
      if (roles.indexOf('ROLE_EVENT_ADMIN') > -1) {
         this.ROLE_EVENT_ADMIN = true;
      }
    }
  }
}
