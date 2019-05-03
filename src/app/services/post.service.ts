<<<<<<< HEAD
import {
  ClubMembersComponent,
  MEMBERS
} from "./../pages/club-members/club-members.component";
import { Member } from "./../models/Member";
import { LoginComponent } from "./../pages/login/login.component";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { post } from "selenium-webdriver/http";
import { Body } from "@angular/http/src/body";
import { HttpHeaders } from "@angular/common/http";
import { Data } from "@angular/router";
import { Observable } from "rxjs";
=======
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
>>>>>>> 397a9a0d220762f8078cd646be1c604e6e4d5ab7

@Injectable({
  providedIn: "root"
})
export class PostService {
<<<<<<< HEAD
  private url = "https://user.api.trivesg.com/login/nric-phone-birthdate";
  private refUrl = "https://user.api.trivesg.com/token/refresh";
  private getUrl = "https://org.api.trivesg.com/individual_members";
  private getUrlID = "https://org.api.trivesg.com";
  private getUrlConnect = "https://org.api.trivesg.com/connections"
  constructor(private http: Http) {}

  uConnect(idPost){
    let header = new Headers();
    header.append("Content-Type", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.getUrlConnect, JSON.stringify(idPost), {headers: header});
  }
  getRootID(id) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.getUrlID + id, {headers: header});
  }
  getDataAPI() {
    let header = new Headers();
    header.append("Accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.getUrl, { headers: header });
=======
  private url = 'https://user.api.trivesg.com/login/nric-phone-birthdate';
  private refUrl = 'https://user.api.trivesg.com/token/refresh';
  private getUrl = 'https://org.api.trivesg.com/individual_members';
  constructor(
    private http: HttpClient,
  ) { }

  getPosts() {
   
    let header = new HttpHeaders();
    header.append('Accept', 'application/ld+json');
    header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.getUrl, {headers: header})
>>>>>>> 397a9a0d220762f8078cd646be1c604e6e4d5ab7
  }

  postFormData(post) {
    return this.http.post(this.url, post);
  }
  refreshToken(refresh) {
    return this.http.post(this.refUrl, refresh);
  }
}
