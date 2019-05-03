import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Registration } from '../models/Registration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  apiBase = environment.eventApiBase;
  route = '/registrations';
  url = `${this.apiBase}${this.route}`;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public static getHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/ld+json'
    });
  }

  postRegistration(registration: Registration): Observable<any> {
    return this.http.post(this.url, registration, {headers: AuthService.getHeaders()});
  }
}
