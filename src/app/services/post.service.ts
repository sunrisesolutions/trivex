import { LoginComponent } from './../pages/login/login.component';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { post } from 'selenium-webdriver/http';
import { Body } from '@angular/http/src/body';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://user.api.trivesg.com/login/nric-phone-birthdate';

  constructor(
    private http: Http,
  ) { }

  


  postFormData(post) {

    return this.http.post(this.url, post)

  }

}
