import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

const url = "https://messaging.api.trivesg.com/notif_subscriptions";
const urlDel = "https://messaging.api.trivesg.com";


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor(private http: Http) { }
  addPushSubscriber(sub) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.post(url, sub, { headers: header })
  }
  deleteNotification(idDel) {
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.delete(urlDel + idDel, { headers: header })
  }
  deleteNotifBySearchPublicKey(){
    let header = new Headers();
    header.append("Content-Type", "application/json");
    header.append("accept", "application/ld+json");
    header.append("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.http.get(url + `?p256dhKey=${localStorage.getItem('public_key')}`, {headers:header});
  }
}
