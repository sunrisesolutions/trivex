import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import * as jwt_decoded from 'jwt-decode';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Registration } from "../models/Registration";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { startTimeRange } from "@angular/core/src/profile/wtf_impl";
@Injectable({
  providedIn: "root"
})
export class AuthService implements CanActivate {
  apiBase = environment.eventApiBase;
  route = "/registrations";
  url = `${this.apiBase}${this.route}`;
  isAdmin = false;
  isOrgAdminl = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"], { queryParams: { 'redirectUrl': state.url } });
      return false;
    } else {
      let decoded = jwt_decoded(localStorage.getItem('token'))
      let roles = decoded.roles;
      if (roles) {
        if (roles.indexOf('ROLE_ADMIN') > -1) {
          localStorage.clear();
          alert('Access denied.!!!');
          this.router.navigate(['/login']);
          return false;
        }
        if (roles.indexOf('ROLE_ORG_ADMIN') > -1) {
          return true;
        }
        if (roles.indexOf('ROLE_USER') > -1) {
          return true;
        }
      }
    }
  }
  constructor(private router: Router, private http: HttpClient, snap: ActivatedRoute) { }

  public static getHeaders() {
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
      Accept: "application/ld+json"
    });
  }

  postRegistration(registration: Registration): Observable<any> {
    return this.http.post(this.url, registration, {
      headers: AuthService.getHeaders()
    });
  }
}
