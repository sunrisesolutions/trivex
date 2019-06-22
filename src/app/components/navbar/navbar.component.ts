import { PostService } from "./../../services/post.service";
import { Component, OnInit, ElementRef, Input, Directive, Output } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { ActivatedRoute } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  getLocaleTimeFormat
} from "@angular/common";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { from } from "rxjs";
import { SwPush, SwUpdate } from "@angular/service-worker";
import { PushNotificationService } from "src/app/services/post-notif.service";
import { NgbModal, NgbCarousel, ModalDismissReasons, NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { EventEmitter } from "selenium-webdriver";
import { forEach } from "@angular/router/src/utils/collection";
import { ArrayType } from "@angular/compiler";
import { Delivery } from "src/app/models/Deliveries";
// public_KEY

let VAPID_SERVER_KEY = "BAaWnIATw3HP0YMkQO6vehCxQixCA8V7odcu2cxgEYVEjDu2Ghj6HBKjracCeFKaV38vBsSAz4_yYCW7I6XYRPs";

// ===========

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  // Demo
  closeResult: string;
  // end
  public focus;
  public listTitles: any[];
  public location: Location;
  members;
  getId;
  uuid;
  id;
  deliveries: Delivery[];
  deliveriesByID: Delivery;
  messagesID = '';
  countMess;
  idDelete: any;
  publicKey: any;
  status = false;
  queryDeliveriesREAD = '?readAt%5Bexists%5D=false';
  images = '';
  constructor(
    location: Location,
    public service: PostService,
    private element: ElementRef,
    private router: Router,
    private routes: ActivatedRoute,
    private swPush: SwPush,
    private reqNotif: PushNotificationService,
    private modalService: NgbModal
  ) {
    this.location = location;

  }

  /* MODAL DIALOG */

  open(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    this.service.getMessageById(id)
      .subscribe(res => {
        this.deliveriesByID = res.json();
        this.service.getSender(res.json().message.sender)
          .subscribe(response => {
            this.deliveriesByID.profilePicture = response.json().profilePicture;
            this.deliveriesByID.name = response.json().personData.name;
            console.log(response.json())
          })
      })
    let d = new Date();
    let readed = {
      "readAt": d.getTimezoneOffset(),
    }
    this.service.readDelivery(readed, id)
      .subscribe(res => {
      })
  }
  /* /.MODAL DIALOG */
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.id = localStorage.getItem("im_id");
    this.service.getRootID(this.id).subscribe(res => {
      this.members = res.json();
      console.log("info user", res.json());
    });

    // change status
    if (localStorage.getItem('id_pushNotif') || localStorage.getItem('public_key')) {
      this.status = true;
    } else {
      this.status = false;
    }
    // =======
    this.getDelivery();

    setInterval(() => {
      if (localStorage.getItem('token')) {

        this.getDelivery();
      } else {
        clearInterval();
      }
    }, 5000)

  }


  /* /.SENDER */
  getDelivery() {
    this.service.getDelivery(this.queryDeliveriesREAD)
      .subscribe(res => {
        this.countMess = res.json()['hydra:totalItems'];
      })
    this.service.getDelivery('')
      .subscribe((res) => {
        this.deliveries = res.json()['hydra:member'];
        for (const delivery of this.deliveries) {
          this.service.getSender(delivery['message'].sender)
            .subscribe(response => {
              let profilePicture = response.json().profilePicture;
              let name = response.json().personData.name;
              delivery.name = name;
              delivery.profilePicture = profilePicture;
            });
        }

      });


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
    return 'Dashboard';
  }
  logout() {
    location.reload();
    localStorage.clear();
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

  pushNotif() {

    if (localStorage.getItem("token")) {
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
            console.log("this", res.json());
          });
        })
        .catch(console.error)
    }
  }
}
