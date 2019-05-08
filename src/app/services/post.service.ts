import { environment } from "./../../environments/environment";
import { ClubMembersComponent } from "./../pages/club-members/club-members.component";
import { Member } from "./../models/Member";
import { LoginComponent } from "./../pages/login/login.component";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { post } from "selenium-webdriver/http";
import { Body } from "@angular/http/src/body";
import { HttpHeaders } from "@angular/common/http";
import { Data } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PostService {
  private url = "https://user.api.trivesg.com/login/nric-phone-birthdate";
  private refUrl = "https://user.api.trivesg.com/token/refresh";
  private getUrl = "https://org.api.trivesg.com/individual_members";
  private getUrlConnect = "https://org.api.trivesg.com/connections";
  private urlAT_API =
    "https://user.api.trivesg.com/login/individual-member-access-token";
  constructor(private http: Http) {}

  apiBase = environment.eventApiBase;
  route = "/attendees";
  private urls = `${this.apiBase}${this.route}`;
  // POST REQUEST
  uConnect(idPost) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.getUrlConnect, idPost, { headers: header });
  }
  postFormData(post) {
    return this.http.post(this.url, post);
  }
  refreshToken(refresh) {
    return this.http.post(this.refUrl, refresh);
  }

  loginByAccessToken(access_token): Observable<any> {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.urlAT_API, access_token, {headers: header});
  }
  // GET REQUEST
  getRootID(id) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.getUrl + "/" + id, { headers: header });
  }
  getDataAPI() {
    let header = new Headers();
    header.append("Accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.getUrl, { headers: header });
  }
  getConnect() {
    let header = new Headers();
    header.append("Accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.getUrlConnect, { headers: header });
  }
}
