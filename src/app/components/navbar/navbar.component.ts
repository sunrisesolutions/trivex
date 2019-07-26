import { HttpClient } from '@angular/common/http';
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

const VAPID_SERVER_KEY = "BJxXIPchVoqDSC4w4m6t2_bnptlImeqkcJrhBNsWTrel-AAQ79rmzhUtnoHnG20OFyjnupji8PKBFHsDApsekQc";

// ===========
export var text;
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  /* Test Search */
  search: string = '';
  /* /.Test Search */
  listMessageOptions = [
    { name: 'message-option-1' },
    { name: 'message-option-2' },
    { name: 'message-option-3' },
    { name: 'message-option-4' },
  ];
  config = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    placeholder: 'Select your option',
    // customComparator: ()=>{},
    // limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
  }
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
  delivery2: Delivery;
  messagesID = [''];
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
  profilePicture = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif';
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
    private deviceService: DeviceDetectorService,
    public httpClient: HttpClient

  ) {
    this.location = location;



    /* Notification Click */
    swPush.notificationClicks
      .subscribe(res => {
        console.log(res);
      });
  }

  /* MODAL DIALOG */
  /* read() {
    console.log('read');
  } */
  open(content, delivery) {
    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      // this.delivery = delivery;
    }
    let d = new Date();
    let pramramsRead = {
      "readAt": d.getTimezoneOffset(),
    }
    delivery.readAt = pramramsRead.readAt;
    this.service.readDelivery(pramramsRead, delivery['@id']).subscribe(res => {
    });
  }
  /* /.MODAL DIALOG */
  ngOnInit() {
    // this.listTitles = ROUTES.filter(listTitle => listTitle);
    /*  this.id = localStorage.getItem('im_id');
     this.id = this.id.match(/\d+/g).map(Number); */
    const decoded = jwt_decode(localStorage.getItem('token'));
    console.log('decoded', decoded)
    this.service.getUserByuuid(decoded.im)
      .subscribe(res => {
        this.members = res['hydra:member'];
        for (const member of this.members) {
          this.httpClient.get(member['profilePicture'])
            .subscribe(res => {

            }, error => {
              if (error.status === 404) {
                member['profilePicture'] = 'https://i.gifer.com/B0eS.gif';
              }
            });
        }
      })
    /*  this.service.getRootID(localStorage.getItem('im_id').match(/\d+/g).map(Number)).subscribe(res => {
       this.members = res;
       console.log('info user', res);
     }); */
    // this.id = localStorage.getItem('im_id').match(/\d+/g).map(Number);
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

    this.isSupported();
  }



  getDelivery() {
    this.service.getDelivery('', 1)
      .subscribe((res) => {
        console.log('deliveries', res)
        this.deliveries = res['hydra:member'];
        for (const delivery of this.deliveries) {
          delivery.name = 'Waiting...';
          delivery.profilePicture = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif'
          this.service.getSender(delivery['message'].senderId)
            .subscribe(response => {
              const name = response['personData'].name;
              delivery.name = name;
              delivery.profilePicture = response['profilePicture'];
            });
        }
        console.log('deliveries', this.deliveries)

      });

  }

  toQrCode() {
    this.router.navigate([`/club-members/${localStorage.getItem('im_id').match(/\d+/g).map(Number)}/qr-code`]);

  }
  toInfo() {
    return this.router.navigate([`/club-members/${localStorage.getItem('im_id').match(/\d+/g).map(Number)}/info`]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isSupported(): boolean {
    return 'Notification' in window;
  }

  statusControl(statusInput) {
    console.log('status push', this.status, statusInput.checked);
    if (statusInput.checked === true) {
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
          console.error('error', err);
          alert('There is some problem in subscribing your device for push notification.');
          this.status = false;
          statusInput.checked = false;
        })

    } else if ((statusInput.checked === false && localStorage.getItem("pulish_key")) || (statusInput.checked === false && localStorage.getItem("id_pushNotif"))) {
      if (localStorage.getItem('id_pushNotif')) {
        /* DeleteNotification to api */
        this.reqNotif.deleteNotification(localStorage.getItem('id_pushNotif'))
          .subscribe(res => {
            localStorage.removeItem('id_pushNotif');
            localStorage.removeItem('public_key');
          }, err => {
            if (err.status === 404) {
              localStorage.removeItem('id_pushNotif');
              localStorage.removeItem('public_key');
              statusInput.checked = false;
              this.status = false;
            }
          });
      } else if (localStorage.getItem('public_key')) {
        this.reqNotif.deleteNotifBySearchPublicKey()
          .subscribe(res => {
            this.reqNotif.deleteNotification(this.getId)
              .subscribe(res => {
                localStorage.removeItem('public_key');
              });

          }, err => {
            if (err.status === 404) {
              localStorage.removeItem('id_pushNotif');
              localStorage.removeItem('public_key');
              statusInput.checked = false;
              this.status = false;
            }
          });
      }
    }
  }

  testSearchMethod(eventText) {
    this.router.navigate(['/club-members'], { queryParams: { name: eventText } });
    // console.log(text);
  }

  injectNumber(s) {
    return s = s.match(/\d+/g).map(Number);
  }
}
