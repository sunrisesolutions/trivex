import { environment } from "./../../environments/environment";
import { ClubMembersComponent } from "./../pages/club-members/club-members.component";
import { Member } from "./../models/Member";
import { LoginComponent } from "./../pages/login/login.component";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
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
  loginAccessToken(post): Observable<Object> {
    /* const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    }; */
    return this.http.post(`https://user.api.trivesg.com/login/individual-member-access-token`, post);
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
  getUserByuuid(uuid): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(`${this.getUrl}/individual_members?uuid=${uuid}`, httpOptions);
  }
  getRootID(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(this.getUrl + "/individual_members/" + id, httpOptions);
  }
  getDataAPI(page): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(this.getUrl + `/individual_members${page}`, httpOptions);
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

  putDelivery(read, id): Observable<Object> {
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
  /*  OptionSets API */
  optionSetsGet(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(`${this.postMessage}/option_sets${id}`, httpOptions);
  }
  optionSetsPost(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.post(`${this.postMessage}/option_sets`, body, httpOptions);
  }
  optionSetsPut(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.put(`${this.postMessage}/option_sets/${id}`, body, httpOptions);
  }
  optionSetsDelete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.delete(`${this.postMessage}${id}`, httpOptions);
  }
  /* Message Option API */
  messageOptionsPost(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.post(`${this.postMessage}/message_options`, body, httpOptions);
  }
  messageOptionsPut(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.put(`${this.postMessage}/message_options/${id}`, body, httpOptions);
  }
  messageOptionsDelete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.delete(`${this.postMessage}/message_options/${id}`, httpOptions);
  }
  messageOptionsGet(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(`${this.postMessage}/message_option${page}`, httpOptions);
  }
  /* Organisation API */
  subdomainFilter(subdomain) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    let subApi = "https://org.api.trivesg.com"
    return this.http.get(`https://org.api.trivesg.com?sudomain=${subdomain}`, httpOptions);
  }
  getLogoFilter(subdomain) {
    return this.http.get(`https://org.api.trivesg.com/organisation/logourl/${subdomain}`);
  }
  /* /.Organisation API */
}
