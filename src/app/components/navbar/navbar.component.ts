import { PostService } from "./../../services/post.service";
import { Component, OnInit, ElementRef, Input, Directive, Output, getPlatform } from "@angular/core";
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
import { from, Observable } from "rxjs";
import { SwPush, SwUpdate } from "@angular/service-worker";
import { PushNotificationService } from "src/app/services/post-notif.service";
import { NgbModal, NgbCarousel, ModalDismissReasons, NgbCarouselConfig, NgbCarouselModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { EventEmitter } from "selenium-webdriver";
import { forEach } from "@angular/router/src/utils/collection";
import { ArrayType } from "@angular/compiler";
import { Delivery } from "src/app/models/Deliveries";
import { DeviceDetectorService } from "ngx-device-detector";
// public_KEY

let VAPID_SERVER_KEY = "BJxXIPchVoqDSC4w4m6t2_bnptlImeqkcJrhBNsWTrel-AAQ79rmzhUtnoHnG20OFyjnupji8PKBFHsDApsekQc";

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
  delivery: Delivery;
  messagesID = '';
  countMess;
  fakeCountMess;
  idDelete: any;
  publicKey: any;
  status = false;
  statusChangeSuccessful = true;
  modalSHOW = false;
  statusMessage;
  queryDeliveriesREAD = '?readAt[exists]=false&';
  images = '';
  deviceInfo = null;
  public permission: NotificationPermission;
  constructor(
    location: Location,
    public service: PostService,
    private element: ElementRef,
    private router: Router,
    private routes: ActivatedRoute,
    private swPush: SwPush,
    private reqNotif: PushNotificationService,
    private modalService: NgbModal,
    private config: NgbDropdownConfig,
    private deviceService: DeviceDetectorService,

  ) {
    this.location = location;
  }

  /* MODAL DIALOG */

  open(content, delivery) {
    this.modalSHOW = true;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
    this.delivery = delivery;
    let d = new Date();
    let pramramsRead = {
      "readAt": d.getTimezoneOffset(),
    }
    delivery.readAt = pramramsRead.readAt;
    this.service.readDelivery(pramramsRead, delivery['@id'])
      .subscribe(res => {
      });
  }
  /* /.MODAL DIALOG */
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.id = localStorage.getItem("im_id");
    this.service.getRootID(this.id).subscribe(res => {
      this.members = res;
      console.log("info user", res);
    });

    // change status
    if (localStorage.getItem('id_pushNotif') || localStorage.getItem('public_key')) {
      this.status = true;
    }
    this.getDelivery();
    // =======
    setInterval(() => {
      if (localStorage.getItem('token')) {
        this.service.getDelivery(this.queryDeliveriesREAD, 1)
          .subscribe(res => {
            this.countMess = res['hydra:totalItems'];
            if (this.fakeCountMess < this.countMess) {
              return this.getDelivery();
            }
          })
        setTimeout(() => {
          this.fakeCountMess = this.countMess;
        }, 2000)
      }
    }, 2000)
    this.swPush.notificationClicks
    .subscribe(res => {
      console.log('notification',res);
    })

  }



  getDelivery() {
    this.service.getDelivery('', 1)
      .subscribe((res) => {
        this.deliveries = res['hydra:member'];
        for (let delivery of this.deliveries) {
          this.service.getSender(delivery['message'].sender)
            .subscribe(response => {
              let profilePicture = response['profilePicture'];
              let name = response['personData'].name;
              delivery.name = name;
              delivery.profilePicture = profilePicture;
            });
        }
        console.log('deliveries', this.deliveries)

      });

  }

  toQrCode() {
    let id = this.id
    this.router.navigate([`/club-members/${id}/qr-code`]);

  }

  logout() {
    location.reload();
    localStorage.clear();
  }

  public isSupported(): boolean {
    return 'Notification' in window;
  }

  statusControl(statusControl) {
    console.log('status push',this.status,statusControl);
    if (this.status === true) {
      console.log('001')
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_SERVER_KEY,
      })
        .then(sub => {
          let s = sub.toJSON();
          let contentEncoding = PushManager.supportedContentEncodings[0];
          console.log(s)
          let contain = {
            "endpoint": s.endpoint,
            "expirationTime": s.expirationTime,
            "authToken": s.keys.auth,
            "p256dhKey": s.keys.p256dh,
            "contentEncoding": contentEncoding

          }
          this.reqNotif.addPushSubscriber(contain).subscribe(res => {
            this.idDelete = res['@id'];
            this.publicKey = res.p256dhKey
            localStorage.setItem('id_pushNotif', this.idDelete);
            localStorage.setItem('public_key', this.publicKey);
            console.log("this", res);
          });


        })
        .catch(err => {
          console.error(err);
          this.statusChangeSuccessful = false;
          alert('There is some problem in subscribing your device for push notification.')
          statusControl.checked = false;
        })
    } else if ((this.status === false && localStorage.getItem("pulish_key")) || (this.status === false && localStorage.getItem("id_pushNotif"))) {
      if (localStorage.getItem('id_pushNotif')) {
        this.reqNotif.deleteNotification(localStorage.getItem('id_pushNotif'))
          .subscribe(res => {
            localStorage.removeItem('id_pushNotif');
            localStorage.removeItem('public_key');
            console.log(res);
            this.swPush.unsubscribe();

          })
      }
      else if (localStorage.getItem('public_key')) {
        this.reqNotif.deleteNotifBySearchPublicKey()
          .subscribe(res => {
            this.reqNotif.deleteNotification(this.getId)
              .subscribe(res => {
                console.log(res);
                localStorage.removeItem('public_key');
              })
            this.swPush.unsubscribe();

          })

      }
    }
  }
}
