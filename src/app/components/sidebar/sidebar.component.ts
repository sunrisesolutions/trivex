import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { ResourceParent } from '../../models/ResourceParent';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

const VAPID_SERVER_KEY = 'BAaWnIATw3HP0YMkQO6vehCxQixCA8V7odcu2cxgEYVEjDu2Ghj6HBKjracCeFKaV38vBsSAz4_yYCW7I6XYRPs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /* SELECT Options*/
  routes: RouteInfo[] = [
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
  listMessageOptions = [];
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
  };
  /* /.SELECT Options */
  public menuItems: any[];
  public exampleMenuItems: any[];
  public isCollapsed = true;
  uuid;
  img;
  member;
  countMess;
  idDelete: any;
  active;
  publicKey: any;
  status = false;
  getId;
  fakeCountMess;
  queryDeliveriesREAD = '&readAt%5Bexists%5D=false';
  deliveries: Delivery[];
  delivery2: Delivery;
  haveRole = {
    path: '/post-announcement',
    title: 'Post an announcement',
    icon: 'ni-bell-55 text-yellow',
    class: '',

  };
  haveRoleRecentAnnoucement = {
    path: '/club-members/notifications/outgoing',
    title: 'Recent announcements',
    icon: 'ni-archive-2 text-purple',
    class: '',
    badge: true
  };
  messagesID = '';
  deviceInfo = null;
  currentPage = 1;
  countSide = 0;
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
    this.decoded = jwt_decode(localStorage.getItem('token'));
  }

  isOutgoing(delivery: Delivery) {
    return delivery.message.senderUuid == this.decoded.im;
  }

  decoded: any;

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
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
        this.service.getDelivery(this.queryDeliveriesREAD + '&groupByMessage=true&messageSenderUuid=' + this.decoded.im, 1)
          .subscribe(res => {
            this.countMess = res['hydra:totalItems'];
            if (this.fakeCountMess < this.countMess) {
              return this.getDelivery();
            }
          });
        this.countSideBar();
        setTimeout(() => {
          this.fakeCountMess = this.countMess;
        }, 2000);
      }
    }, 2000);
    this.getInfoUser();
    if (this.checkingRole()) {
      this.routes.push(this.haveRole);
      this.routes.push(this.haveRoleRecentAnnoucement);
    }
  }

  getInfoUser() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    this.service.getUserByuuid(decoded.im)
      .subscribe(res => {
        this.member = res['hydra:member'][0];
        if (this.member) {
          if (res['hydra:member'][0]['profilePicture']) {
            this.httpClient.get(this.member['profilePicture'])
              .subscribe(res => {

              }, error => {
                if (error.status === 404) {
                  this.member['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                }
              });
          } else {
            this.member['profilePicture'] = '/assets/img-process/Not-found-img.gif';
          }
        }
      });
  }

  /* /.Device detector */

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
    if (delivery.arrayOptions) {
      this.statisticalOptions(delivery.arrayOptions, delivery)
    };

    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true });
      // this.delivery = delivery;
    }
    const d = new Date();
    const pramramsRead = {
      // "readAt": d.getTimezoneOffset(),
      read: true
    };
    // delivery.readAt = pramramsRead.readAt;
    this.service.readDelivery(pramramsRead, delivery)
      .subscribe((res: Delivery) => {
        delivery.readAt = res.readAt;
      });
  }

  incomingOnly = true;

  toggleIncomingMessageFilter(type: string) {
    if (this.incomingOnly === null) {
      if (type === 'incoming') {
        this.incomingOnly = true;
      } else {
        this.incomingOnly = false;
      }
    } else {
      if (type === 'incoming') {
        this.incomingOnly = this.incomingOnly ? null : true;
      } else {
        this.incomingOnly = this.incomingOnly ? false : null;
      }
    }

    this.deliveries = [];
    this.getDelivery();
  }

  getDelivery() {
    let query = '&groupByMessage=true';
    if (this.incomingOnly) {
      query += '&messageSenderUuid=' + this.decoded.im;
    } else if (this.incomingOnly === false) {
      query += '&message.sender.uuid=' + this.decoded.im;
    }

    this.service.getDelivery(query, 1)
      .subscribe((res) => {
        // console.log('deliveries', res)
        this.deliveries = res['hydra:member'];
        for (const delivery of this.deliveries) {
          delivery.name = 'Waiting...';
          delivery['profilePicture'] = '/assets/img-process/Loading-img.gif';
          if (delivery['message'].senderUuid !== undefined) {
            this.service.getSender(`?uuid=${delivery['message'].senderUuid}`)
              .subscribe(response => {
                let data = response['hydra:member'];
                if (data[0]) {
                  delivery['name'] = data[0]['personData'].name;
                  // console.log('data', data)
                  let profilePicture = data[0]['profilePicture'];

                  delivery['profilePicture'] = profilePicture;
                  if (delivery['profilePicture']) {
                    this.httpClient.get(delivery['profilePicture'])
                      .subscribe(res => {

                      }, err => {
                        if (err.status === 404) {
                          delivery.profilePicture = '/assets/img-process/Not-found-img.gif';
                        }
                      });
                  } else {
                    delivery.profilePicture = '/assets/img-process/Not-found-img.gif';
                  }
                }
              });
          }
          if (delivery['message']['optionSet']) {
            this.service.optionSetsGet(`/${delivery['message'].optionSet['@id'].match(/\d+/g).map(Number)}/message_options`)
              .subscribe(res => {
                this.listMessageOptions = res['hydra:member'];
                delivery['arrayOptions'] = res['hydra:member'];
                for (let option of this.listMessageOptions) {
                  option['selectedOptionMessage'] = false;
                }
              });

          }

        }
        console.log('deliveries', this.deliveries);

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
            'endpoint': s.endpoint,
            'expirationTime': s.expirationTime,
            'authToken': s.keys.auth,
            'p256dhKey': s.keys.p256dh,
            'contentEncoding': contentEncoding

          };
          this.reqNotif.addPushSubscriber(contain).subscribe(res => {
            this.idDelete = res['@id'];
            this.publicKey = res.p256dhKey;
            localStorage.setItem('id_pushNotif', this.idDelete);
            localStorage.setItem('public_key', this.publicKey);
          });
        })
        .catch(res => {
          console.error(res);
          setTimeout(() => {
            alert('There is some problem in subscribing your device for push notification.');
            return this.status = false;
          }, 300);
        });
    }
    setTimeout(() => {
      if ((this.status === false && localStorage.getItem('pulish_key')) || (this.status === false && localStorage.getItem('id_pushNotif'))) {
        if (localStorage.getItem('id_pushNotif')) {
          this.reqNotif.deleteNotification(localStorage.getItem('id_pushNotif'))
            .subscribe(res => {
              localStorage.removeItem('id_pushNotif');
              localStorage.removeItem('public_key');
            });
        } else if (localStorage.getItem('public_key')) {
          this.reqNotif.deleteNotifBySearchPublicKey()
            .subscribe(res => {
              this.reqNotif.deleteNotification(this.getId)
                .subscribe(res => {
                  localStorage.removeItem('public_key');
                });
            });
        }

      }
    }, 500);

  }

  putApproval(options, infoDelivery) {
    let ar = [];
    let selectedOption = null;
    for (let option of options) {
      if (option['selectedOptionMessage']) {
        selectedOption = option;
        ar.push(option['uuid']);
      }
    }
    let idDelivery = infoDelivery['@id'];
    let bodyMessageOption = {
      'selectedOptions': ar
    };
    this.service.putDelivery(bodyMessageOption, `${idDelivery}`)
      .subscribe(res => {
        this.statisticalOptions(options, infoDelivery);
        infoDelivery.selectedOptions.push(selectedOption);
        /* console.log(res);
        alert('Successfully.!!!'); */
      }, error => {
        if (error.status === 400) {
          alert(error.error['hydra:description']);
        }
        if (error.status === 404) {
          alert(error.error['hydra:description']);
        }
        if (error.status === 500) {
          alert(error.error['hydra:description']);
        }
      });
  }


  statisticalOptions(options, infoDelivery: Delivery = null) {
    let query = '';
    const parents: Array<ResourceParent> = [];
    const parent = new ResourceParent();
    parent.id = infoDelivery.messageId;
    parent.name = 'messages';
    parents.push(parent);

    query += '&selectedOptions=MSG-';

    this.service.getDelivery(query, this.currentPage, parents)
      .subscribe(res => {
        for (let o of options) {
          let query = '';
          const parents: Array<ResourceParent> = [];
          const parent = new ResourceParent();
          parent.id = infoDelivery.messageId;
          parent.name = 'messages';
          parents.push(parent);

          query += '&selectedOptions=' + o.uuid;
          this.service.getDelivery(query, this.currentPage, parents)
            .subscribe(optionRes => {
              o['voted'] = optionRes['hydra:totalItems'];
              o['totalVotes'] = res['hydra:totalItems'];
            });
        }
        console.log(options);
      });
  }

  parseInt(number) {
    return Number.parseInt(number);
  }


  isActiveOption(item) {
    for (let i of item) {
      if (this.active === i.name) {
        i['selectedOptionMessage'] = !i['selectedOptionMessage'];
      } else {
        i['selectedOptionMessage'] = false;
      }
    }
  }

  selectOption(item) {
    this.active = item;
  }

  countSideBar() {
    let decoded = jwt_decode(localStorage.getItem('token'))
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    this.httpClient.get(`https://messaging.api.trivesg.com/deliveries?optionsSelectedAt[exists]=true&selectedOptionsReadAt[exists]=false&message.sender.uuid=%7B${decoded.im}%7D&groupByMessage=true`, httpOptions)
      .subscribe(res => {
        this.countSide = res['hydra:member'].length;
      })
  }
}
