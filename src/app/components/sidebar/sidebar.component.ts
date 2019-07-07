import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from 'src/app/services/post-notif.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Delivery } from 'src/app/models/Deliveries';
import { Route } from '@angular/compiler/src/core';
import { Location } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: `/club-members`,
    title: 'Club Members',
    icon: 'ni-bullet-list-67 text-red',
    class: ''
  },
  {
    path: '/member-connect',
    title: 'Members I have met',
    icon: 'ni-planet text-blue',
    class: ''
  },
  {
    path: '/post-announcement',
    title: 'Post an announcement',
    icon: 'ni-bell-55 text-yellow',
    class: '',

  }
];

const VAPID_SERVER_KEY = 'BAaWnIATw3HP0YMkQO6vehCxQixCA8V7odcu2cxgEYVEjDu2Ghj6HBKjracCeFKaV38vBsSAz4_yYCW7I6XYRPs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public exampleMenuItems: any[];
  public isCollapsed = true;
  uuid;
  img;
  members;
  countMess;
  idDelete: any;
  publicKey: any;
  status = false;
  getId;
  fakeCountMess;
  queryDeliveriesREAD = '?readAt%5Bexists%5D=false&';
  deliveries: Delivery[];
  delivery: Delivery;
  messagesID = '';
  deviceInfo = null;
  constructor(private modalService: NgbModal, private router: Router, private service: PostService,
    private _location: Location,
    private swPush: SwPush,
    private reqNotif: PushNotificationService,
    private deviceService: DeviceDetectorService
  ) {

  }

  open(content, delivery) {
    delivery['idSender']=delivery['message'].sender;
    delivery['idSender']=delivery['idSender'].match(/\d+/g).map(Number);
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      this.delivery = delivery;
    }
    let d = new Date();
    let pramramsRead = {
      "readAt": d.getTimezoneOffset(),
    }
    delivery.readAt = pramramsRead.readAt;
    this.service.readDelivery(pramramsRead, delivery['@id'])
      .subscribe(res => {
      });
  }

  ngOnInit() {
    this.service.getDataAPI().subscribe(res => {
      this.uuid = localStorage.getItem('im_id');
      this.service.getRootID(this.uuid).subscribe(res => {
        const getInfo = res['profilePicture'];
        this.members = getInfo;
        console.log('info user', res);
      });
    });

    // change status
    if (localStorage.getItem('id_pushNotif') || localStorage.getItem('public_key')) {
      this.status = true;
    }
    // =============

    this.menuItems = ROUTES;
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
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
    this.epicFunction();
  }

  /* Device detector */
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  /* /.Device detector */


  getDelivery() {
    setInterval(() => {
      if (localStorage.getItem('token')) {
        this.service.getDelivery(this.queryDeliveriesREAD, 1)
          .subscribe(res => {
            this.countMess = res['hydra:totalItems'];
          })
      }
    }, 5000)

    this.service.getDelivery('', 1)
      .subscribe((res) => {
        this.deliveries = res['hydra:member'];
        for (let delivery of this.deliveries) {
          delivery.name = 'Waiting...';
          delivery.profilePicture = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif'
          this.service.getSender(delivery['message'].senderId)
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
  toInfo() {
    this.router.navigate([`/club-members/${this.uuid}/info`]);

  }
  toQrCode() {
    this.router.navigate([`club-members/${this.uuid}/qr-code`]);
  }
  logout() {
    location.reload();
    localStorage.clear();
  }
  // notif
  pushNotif() {

    if (localStorage.getItem('token')) {
      if (this.swPush.isEnabled) {
        this.swPush.requestSubscription({
          serverPublicKey: VAPID_SERVER_KEY,
        })
          .then(sub => {
            const s = sub.toJSON();
            const contain = {
              'endpoint': s.endpoint,
              'authToken': s.keys.auth,
              'p256dhKey': s.keys.p256dh
            };
            this.reqNotif.addPushSubscriber(contain).subscribe(res => {
              this.idDelete = res.json()['@id'];
              this.publicKey = res.json().p256dhKey;
              localStorage.setItem('id_pushNotif', this.idDelete);
              localStorage.setItem('public_key', this.publicKey);
              console.log('this', res.json());
            });
          })
          .catch(console.error);
      }
    }
  }

  statusControl() {
    console.log(this.status);
    if (this.status === true) {
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_SERVER_KEY,
      })
        .then(sub => {
          let s = sub.toJSON();
          let contentEncoding = PushManager.supportedContentEncodings[0];
          console.log(contentEncoding)
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
        .catch(res => {
          console.error(res);
          setTimeout(() => {
            alert('There is some problem in subscribing your device for push notification.')
            return this.status = false;
          }, 300)
        })
    } setTimeout(() => {
      if ((this.status === false && localStorage.getItem("pulish_key")) || (this.status === false && localStorage.getItem("id_pushNotif"))) {
        if (localStorage.getItem('id_pushNotif')) {
          this.reqNotif.deleteNotification(localStorage.getItem('id_pushNotif'))
            .subscribe(res => {
              localStorage.removeItem('id_pushNotif');
              localStorage.removeItem('public_key');
              console.log(res);
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
            })
        }

      }
    }, 500)

  }
}
