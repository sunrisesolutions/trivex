import { PostService } from "./../../services/post.service";
import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { ActivatedRoute } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { from } from "rxjs";
import { SwPush, SwUpdate } from "@angular/service-worker";
import { PushNotificationService } from "src/app/services/post-notif.service";

// public_KEY

let VAPID_SERVER_KEY = "BAaWnIATw3HP0YMkQO6vehCxQixCA8V7odcu2cxgEYVEjDu2Ghj6HBKjracCeFKaV38vBsSAz4_yYCW7I6XYRPs";

// ===========

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  // Demo

  // end
  public focus;
  public listTitles: any[];
  public location: Location;
  members;
  getId;
  uuid;
  id;
  messages;
  countMess;
  idDelete: any;
  publicKey: any;
  status = false;
  constructor(
    location: Location,
    private service: PostService,
    private element: ElementRef,
    private router: Router,
    private routes: ActivatedRoute,
    private swPush: SwPush,
    private reqNotif: PushNotificationService,
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.id = localStorage.getItem("im_id");
    this.service.getRootID(this.id).subscribe(res => {
      let getInfo = res.json();
      this.members = [getInfo];
      console.log("info user", res.json());
    });

    // change status
    if (localStorage.getItem('id_pushNotif') || localStorage.getItem('public_key')) {
      this.status = true;
    } else {
      this.status = false;
    }
    // =======

    this.service.getMessage()
      .subscribe(res => {
        let messages = res.json()["hydra:member"]
        this.messages = messages;
        this.countMess = res.json()["hydra:member"].length;
        console.log("Message INFO", this.messages)
      })
    // getMessages
    setInterval(() => {
      this.service.getMessage()
        .subscribe(res => {
          let messages = res.json()["hydra:member"]
          this.messages = messages;
          this.countMess = res.json()["hydra:member"].length;
        })
    }, 5000);
  }
  toInfo() {
    let id = this.id;
    this.router.navigate([`/club-members/${id}/info`])

  }
  toQrCode() {
    let id = this.id
    this.router.navigate([`/club-members/${id}/qr-code`]);

  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(2);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
  logout() {
    localStorage.clear();
  }



  pushNotif() {

    if (localStorage.getItem("token")) {
      if (this.swPush.isEnabled) {
        this.swPush.requestSubscription({
          serverPublicKey: VAPID_SERVER_KEY,
        })
          .then(sub => {
            let s = sub.toJSON();
            let contain = {
              "endpoint": s.endpoint,
              "authToken": s.keys.auth,
              "p256dhKey": s.keys.p256dh
            }
            this.reqNotif.addPushSubscriber(contain).subscribe(res => {
              this.idDelete = res.json()['@id'];
              this.publicKey = res.json().p256dhKey
              localStorage.setItem('id_pushNotif', this.idDelete);
              localStorage.setItem('public_key', this.publicKey);
              console.log("this", res.json())
            });
          })
          .catch(console.error)
      }
    }
  }

  statusControl() {
    this.status = !this.status;
    console.log(this.status);
    if (this.status == true) {
      this.pushNotif();
    }
    if (this.status == false) {
      if (localStorage.getItem('id_pushNotif')) {
        this.reqNotif.deleteNotification(localStorage.getItem('id_pushNotif'))
          .subscribe(res => {
            localStorage.removeItem('id_pushNotif');
            localStorage.removeItem('public_key');
            console.log(res.json());
          })
      }
      else if (localStorage.getItem('public_key')) {
        this.reqNotif.deleteNotifBySearchPublicKey()
          .subscribe(res => {
            console.log(res.json())
            let del = res.json()['hydra:member'];
            for (let i in del) {
              this.getId = res.json()['hydra:member'][`${i}`]['@id']
            }
            console.log(this.getId)
            this.reqNotif.deleteNotification(this.getId)
              .subscribe(res => {
                console.log(res.json());
              })
            localStorage.removeItem('public_key');
          })

      }
    }
  }
}
