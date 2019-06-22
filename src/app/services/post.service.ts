import { environment } from "./../../environments/environment";
import { ClubMembersComponent } from "./../pages/club-members/club-members.component";
import { Member } from "./../models/Member";
import { LoginComponent } from "./../pages/login/login.component";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { post } from "selenium-webdriver/http";
import { Body } from "@angular/http/src/body";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Data } from "@angular/router";
import { Observable } from "rxjs";

/* header */

/* /.header */

@Injectable({
  providedIn: "root"
})
export class PostService {
  private url = "https://user.api.trivesg.com/login/nric-phone-birthdate";
  private refUrl = "https://user.api.trivesg.com/token/refresh";
  private getUrl = "https://org.api.trivesg.com";
  private getUrlConnect = "https://org.api.trivesg.com/connections";
  private postMessage = "https://messaging.api.trivesg.com";
  private urlAT_API = "https://user.api.trivesg.com/login/individual-member-access-token";
  constructor(private http: Http) { }

  apiBase = environment.eventApiBase;
  route = "/attendees";
  private urls = `${this.apiBase}${this.route}`;
  // POST REQUEST
  uConnect(idPost) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.getUrlConnect, idPost, { headers: header });
  }
  postFormData(post) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.url, post);
  }
  refreshToken(refresh) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.refUrl, refresh);
  }

  loginByAccessToken(access_token): Observable<any> {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.urlAT_API, access_token, { headers: header });
  }

  // GET REQUEST

  getRootID(id) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.getUrl + "/individual_members/" + id, { headers: header });
  }
  getDataAPI(page:number=1) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.getUrl + `/individual_members?page=${page}`, { headers: header });
  }
  getConnect(page: number = 1) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(`${this.getUrlConnect}?page=${page}`, { headers: header });
  }


  /* MESSAGES REQUEST*/
  messagePost(message) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(this.postMessage + '/messages', message, { headers: header });
  }
  getMessage() {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.postMessage + '/messages', { headers: header });
  }
  getSender(id): Observable<any> {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(`${this.getUrl}${id}`, { headers: header })
  }
  getDelivery(query,page:number=1): Observable<any> {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.postMessage + `/deliveries${query}?page=${page}`, { headers: header });
  }

  readDelivery(read, id) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.put(`${this.postMessage}${id}`, read, { headers: header });
  }
  getMessageById(id) {
    let header = new Headers();
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(this.postMessage + `${id}`, { headers: header });
  }
  /* /.MESSAGES */
}
