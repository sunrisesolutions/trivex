import { LoginComponent } from './../pages/login/login.component';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { Body } from '@angular/http/src/body';
import { HttpHeaders } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://user.api.trivesg.com/login/nric-phone-birthdate';
  private refUrl = 'https://user.api.trivesg.com/token/refresh';
  private getUrl = 'https://org.api.trivesg.com/individual_members';
  constructor(
    private http: Http,
  ) { }

  getPosts() {
   
    let header = new Headers();
    header.append('Accept', 'application/ld+json');
    header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.getUrl, {headers: header})
  }

  postFormData(post) {
    return this.http.post(this.url, post)
  }
  refreshToken(refresh) {
    return this.http.post(this.refUrl, refresh)
  }

}
