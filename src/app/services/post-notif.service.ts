import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* HEADER */

/* /.HEADER */

const url = "https://messaging.api.trivesg.com/notif_subscriptions";
const urlDel = "https://messaging.api.trivesg.com";


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  /* Header */

  /* /.HEADER */
  constructor(private http: HttpClient) { }
  addPushSubscriber(sub): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.post(url, sub, httpOptions)
  }
  deleteNotification(idDel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.delete(`${urlDel}${idDel}`,httpOptions)
  }
  deleteNotifBySearchPublicKey(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };
    return this.http.get(url + `?p256dhKey=${localStorage.getItem('public_key')}`, httpOptions);
  }
}
