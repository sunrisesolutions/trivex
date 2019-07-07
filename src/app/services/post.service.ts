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
  constructor(private http: HttpClient) { }

  apiBase = environment.eventApiBase;
  route = "/attendees";
  private urls = `${this.apiBase}${this.route}`;
  // POST REQUEST
  uConnect(idPost): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this.http.post(this.getUrlConnect, idPost, httpOptions);
  }
  postFormData(post): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.post(this.url, post, httpOptions);
  }
  refreshToken(refresh): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.post(this.refUrl, refresh);
  }

  loginByAccessToken(access_token): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.post(this.urlAT_API, access_token, httpOptions);
  }

  // GET REQUEST

  getRootID(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(this.getUrl + "/individual_members/" + id, httpOptions);
  }
  getDataAPI(page: number = 1): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(this.getUrl + `/individual_members?page=${page}`, httpOptions);
  }
  getConnect(page: number = 1): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(`${this.getUrlConnect}?page=${page}`, httpOptions);
  }


  /* MESSAGES REQUEST*/
  messagePost(message): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.post(this.postMessage + '/messages', message, httpOptions);
  }
  getMessage(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(this.postMessage + '/messages', httpOptions);
  }
  getSender(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(`${this.getUrl}/individual_members/${id}`, httpOptions)
  }
  getDelivery(query, page: number = 1): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(this.postMessage + `/deliveries${query}?page=${page}`, httpOptions);
  }

  readDelivery(read, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.put(`${this.postMessage}${id}`, read, httpOptions);
  }
  getMessageById(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(this.postMessage + `/deliveries/${id}`, httpOptions);
  }
  /* /.MESSAGES */
}
