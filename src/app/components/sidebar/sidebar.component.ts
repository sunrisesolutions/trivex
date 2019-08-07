import { HttpClient } from '@angular/common/http';
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
import * as jwt_decode from 'jwt-decode';
import { CheckRoleService } from 'src/app/services/check-role.service';

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
    path: '/free-on-message',
    title: 'Free On Message',
    icon: 'ni-email-83 text-black',
    class: ''
  }
];
const VAPID_SERVER_KEY = 'BAaWnIATw3HP0YMkQO6vehCxQixCA8V7odcu2cxgEYVEjDu2Ghj6HBKjracCeFKaV38vBsSAz4_yYCW7I6XYRPs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /* SELECT Options*/
  routes = ROUTES;
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
  /* /.SELECT Options */
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
  delivery2: Delivery;
  haveRole = {
    path: '/post-announcement',
    title: 'Post an announcement',
    icon: 'ni-bell-55 text-yellow',
    class: '',

  };
  messagesID = '';
  deviceInfo = null;
  member = [];
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private service: PostService,
    public httpClient: HttpClient,
    private _location: Location,
    private swPush: SwPush,
    private reqNotif: PushNotificationService,
    private deviceService: DeviceDetectorService,
    public roleChecker: CheckRoleService
  ) {
  }

  checkingRole(): boolean {
    if (this.roleChecker.ROLE_MSG_ADMIN) {
      return true;
    } else if (this.roleChecker.ROLE_MSG_USER) {
      return true;
    } else if (this.roleChecker.ROLE_ORG_ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  open(content, delivery) {
    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      // this.delivery = delivery;
    }
    const d = new Date();
    const pramramsRead = {
      "readAt": d.getTimezoneOffset(),
    };
    delivery.readAt = pramramsRead.readAt;
    this.service.readDelivery(pramramsRead, delivery['@id'])
      .subscribe(res => {
      });
  }

  ngOnInit() {
    if(this.checkingRole()){
      return this.routes.push(this.haveRole)
    }
    /* this.service.getDataAPI().subscribe(res => {

    }); */
    const decoded = jwt_decode(localStorage.getItem('token'));

    this.service.getUserByuuid(decoded.im)
      .subscribe(res => {
        this.members = res['hydra:member'];
        for (let member of this.members) {
          this.httpClient.get(member['profilePicture'])
            .subscribe(res => {

            }, error => {
              if (error.status === 404) {
                member['profilePicture'] = '/assets/img-process/Not-found-img.gif';
              }
            });
        }
      })
    // change status
    if (localStorage.getItem('id_pushNotif') || localStorage.getItem('public_key')) {
      this.status = true;
    }
    // =============
    
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
    return this.deviceInfo = this.deviceService.getDeviceInfo();
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
        for (const delivery of this.deliveries) {
          delivery.name = 'Waiting...';
          delivery['profilePicture'] = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif'
          if (delivery['message'].senderUuid !== undefined) {
            this.service.getSender(`?uuid=${delivery['message'].senderUuid}`)
              .subscribe(response => {
                let data = response['hydra:member'];
                if (data[0]) {
                  delivery['name'] = data[0]['personData'].name;
                  // console.log('data', data)
                  let profilePicture = data[0]['profilePicture'];

                  delivery['profilePicture'] = profilePicture;

                  this.httpClient.get(delivery['profilePicture'])
                    .subscribe(res => {

                    }, err => {
                      if (err.status === 404) {
                        delivery.profilePicture = 'https://i.gifer.com/B0eS.gif';
                      }
                    })
                }
              });
          }
          if (delivery['message']['optionSet']) {
            this.service.optionSetsGet(`/${delivery['message'].optionSet['@id'].match(/\d+/g).map(Number)}/message_options`)
              .subscribe(res => {
                this.listMessageOptions = res['hydra:member']
                delivery['arrayOptions'] = res['hydra:member'];
                for (let option of this.listMessageOptions) {
                  option['selectedOptionMessage'] = false;
                }
              })

          }
        }

      });

  }
  toInfo() {
    this.router.navigate([`/club-members/${localStorage.getItem('im_id').match(/\d+/g).map(Number)}/info`]);

  }
  toQrCode() {
    this.router.navigate([`/club-members/${localStorage.getItem('im_id').match(/\d+/g).map(Number)}/qr-code`]);
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
            });
          })
          .catch(console.error);
      }
    }
  }

  statusControl() {
    if (this.status === true) {
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_SERVER_KEY,
      })
        .then(sub => {
          let s = sub.toJSON();
          let contentEncoding = PushManager.supportedContentEncodings[0];
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
            })
        }
        else if (localStorage.getItem('public_key')) {
          this.reqNotif.deleteNotifBySearchPublicKey()
            .subscribe(res => {
              this.reqNotif.deleteNotification(this.getId)
                .subscribe(res => {
                  localStorage.removeItem('public_key');
                })
            })
        }

      }
    }, 500)

  }

  putApproval(options, infoDelivery) {
    let ar = [];
    for (let option of options) {
      if (option['selectedOptionMessage']) {
        ar.push(option['uuid'])
      }
    }
    let idDelivery = infoDelivery['@id'];
    let bodyMessageOption = {
      "selectedOptions": ar
    }
    this.service.putDelivery(bodyMessageOption, `${idDelivery}`)
      .subscribe(res => {
        console.log(res)
        alert('Successfully.!!!')
      }, error => {
        if (error.status === 400) {
          alert(error.error['hydra:description'])
        }
        if (error.status === 404) {
          alert(error.error['hydra:description'])
        }
        if (error.status === 500) {
          alert(error.error['hydra:description'])
        }
      })
  }
}
