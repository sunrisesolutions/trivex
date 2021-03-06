import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PostService} from 'src/app/services/post.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SwPush} from '@angular/service-worker';
import {PushNotificationService} from 'src/app/services/post-notif.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Delivery} from 'src/app/models/Deliveries';
import {Route} from '@angular/compiler/src/core';
import {Location} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';
import * as jwt_decode from 'jwt-decode';
import {CheckRoleService} from 'src/app/services/check-role.service';
import {ResourceParent} from '../../models/ResourceParent';
import {OrganisationService} from '../../services/organisation.service';
import {Subscription} from 'rxjs';
import {PwaService} from '../../services/pwa.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

const VAPID_SERVER_KEY = 'BJxXIPchVoqDSC4w4m6t2_bnptlImeqkcJrhBNsWTrel-AAQ79rmzhUtnoHnG20OFyjnupji8PKBFHsDApsekQc';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  /* SELECT Options*/
  routes: RouteInfo[] = [
    {
      path: '/member-connect',
      title: 'Members I have met',
      icon: 'ni-planet text-blue',
      class: ''
    },
  ];

  showOrg = false;
  sub = null;
  orgLogo = 'https://i.ya-webdesign.com/images/peach-svg-animated-6.gif';

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
  member: any = {};
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
  clubMembers = {
    path: `/club-members/list`,
    title: 'Club Members',
    icon: 'ni-bullet-list-67 text-red',
    class: ''
  };
  freeOnMessage = {
    path: '/free-on-delivery',
    title: 'Free On Message',
    icon: 'ni-email-83 text-black',
    class: ''
  };
  manageEvents = {
    path: '/events',
    title: 'Manage Events',
    icon: 'ni-calendar-grid-58 text-black',
    class: ''
  };
  haveRolePostAnnouncement = {
    path: '/post-announcement',
    title: 'Post an announcement',
    icon: 'ni-bell-55 text-yellow',
    class: '',

  };
  haveRoleAnnouncementApproval = {
    path: '/club-members/notifications/announcement-approvals',
    title: 'Announcement Approval',
    icon: 'ni-like-2 text-cyan',
    class: '',
    badge: true,
    badgeType: 'approval'
  };
  haveRoleRecentAnnoucement = {
    path: '/club-members/notifications/outgoing',
    title: 'Recent announcements',
    icon: 'ni-archive-2 text-purple',
    class: '',
    badge: true,
    badgeType: 'recent'
  };
  messagesID = '';
  deviceInfo = null;
  currentPage = 1;
  countSide = 0;
  recentAnnouncementCount = 0;
  approvalCount = 0;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private service: PostService,
    public httpClient: HttpClient,
    private _location: Location,
    private swPush: SwPush,
    private reqNotif: PushNotificationService,
    private deviceService: DeviceDetectorService,
    public roleChecker: CheckRoleService,
    public orgService: OrganisationService,
    public pwa: PwaService,
    private route: ActivatedRoute
  ) {
    this.decoded = jwt_decode(localStorage.getItem('token'));
    this.memberPhotoSub = this.orgService.getMemberPhoto()
      .subscribe(mymessage => {
        if (mymessage != null) {
          this.memberPhoto = this.member['profilePicture'] = mymessage;
        }
      });
  }

  ngOnDestroy() {
    this.memberPhotoSub.unsubscribe();
  }

  memberPhotoSub: Subscription;
  memberPhoto: string;

  isOutgoing(delivery: Delivery) {
    return delivery.message.senderUuid == this.decoded.im;
  }

  decoded: any;

  ngOnInit() {
    this.getSubdomain();
    this.getLogoOrganisation();

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
    // setInterval(() => {
    // }, 2000);

    if (localStorage.getItem('token')) {
      this.service.getDelivery(this.queryDeliveriesREAD + '&groupByMessage=true&recipient.uuid=' + this.decoded.im + '&messageSenderUuid=' + this.decoded.im, 1)
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
    this.route.params.subscribe(params => {
      if (localStorage.getItem('token')) {
        this.service.getDelivery(this.queryDeliveriesREAD + '&groupByMessage=true&recipient.uuid=' + this.decoded.im + '&messageSenderUuid=' + this.decoded.im, 1)
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
    });

    this.getInfoUser();

    let decoded = jwt_decode(localStorage.getItem('token'));
    this.service.G_OrgByUuid(decoded.org)
      .subscribe(res => {
        if (res['hydra:member'][0].freeonMessagingEnabled) {
          this.roleChecker.FREE_ON_MESSAGE = true;
          this.routes.push(this.freeOnMessage);
        }
      });

    if (this.checkingRole()) {
      let decoded = jwt_decode(localStorage.getItem('token'));
      this.service.G_OrgByUuid(decoded.org)
        .subscribe(res => {
          console.log('abc');
          if (res['hydra:member'][0].freeonMessagingEnabled) {
            console.log('def');
            this.roleChecker.FREE_ON_MESSAGE = true;
          }
          console.log('hgj');
          if (this.roleChecker.FREE_ON_MESSAGE) {
            console.log('zzzz');
            // this.routes.push(this.freeOnMessage);
          }
          if (res['hydra:member'][0].adminAnnouncementEnabled && this.roleChecker.ROLE_ORG_ADMIN || res['hydra:member'][0].adminAnnouncementEnabled && this.roleChecker.ROLE_MSG_ADMIN) {
            this.routes.push(this.haveRoleRecentAnnoucement);
          }
          if (res['hydra:member'][0].adminAnnouncementEnabled && this.roleChecker.ROLE_ORG_ADMIN || res['hydra:member'][0].adminAnnouncementEnabled && this.roleChecker.ROLE_MSG_ADMIN || res['hydra:member'][0].adminAnnouncementEnabled && this.roleChecker.ROLE_MSG_USER) {
            this.routes.push(this.haveRolePostAnnouncement);
          }
          if (res['hydra:member'][0].eventEnabled && this.roleChecker.ROLE_EVENT_ADMIN || res['hydra:member'][0].eventEnabled && this.roleChecker.ROLE_ORG_ADMIN) {
            this.routes.push(this.manageEvents); /* Menu event */
          }
        });

      this.routes.push(this.clubMembers);
      this.routes.push(this.haveRoleAnnouncementApproval);
    }
  }

  installPwa() {
    this.pwa.promptEvent.prompt();
  }

  getInfoUser() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    this.service.getUserByuuid(decoded.im)
      .subscribe(res => {
        this.member = res['hydra:member'][0];
        if (this.member) {
          this.memberPhoto = this.member['profilePicture'];
          if (res['hydra:member'][0]['profilePicture']) {
            this.httpClient.get(this.member['profilePicture'])
              .subscribe(res => {

              }, error => {
                if (error.status === 404) {
                  this.memberPhoto = this.member['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                }
              });
          } else {
            this.memberPhoto = this.member['profilePicture'] = '/assets/img-process/Not-found-img.gif';
          }
        }
      });
  }

  /* /.Device detector */
  checkingRole(adminOnly = false): boolean {
    let decoded = jwt_decode(localStorage.getItem('token'));
    this.service.G_OrgByUuid(decoded.org)
      .subscribe(res => {
        if (res['hydra:member'][0].freeonMessagingEnabled) {
          this.roleChecker.FREE_ON_MESSAGE = true;
        }
      });
    if (this.roleChecker.ROLE_MSG_ADMIN) {
      return true;
    } else if (this.roleChecker.ROLE_MSG_USER) {
      return true;
    } else if (this.roleChecker.ROLE_ORG_ADMIN) {
      return true;
    } else if (this.roleChecker.ROLE_EVENT_ADMIN) {
      return true;
    } else {
      return false;
    }
  }

  open(content, delivery) {
    if (delivery.arrayOptions) {
      this.statisticalOptions(delivery.arrayOptions, delivery);
    }
    ;

    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true});
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
      query += '&recipient.uuid=' + this.decoded.im;
    } else if (this.incomingOnly === false) {
      query += '&delivery.sender.uuid=' + this.decoded.im;
    }

    this.service.getDelivery(query, 1)
      .subscribe((res) => {
        // console.log('deliveries', res)
        this.deliveries = res['hydra:member'];
        for (const delivery of this.deliveries) {
          delivery.name = 'Waiting...';
          delivery['profilePicture'] = ' /assets/img-process/giphy-loading.gif';
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

  // ${localStorage.getItem('im_id').match(/\d+/g).map(Number)}

  toInfo() {
    this.router.navigate([`/club-members/${this.member.id}/info`]);

  }

  toQrCode() {
    this.router.navigate([`/club-members/${this.member.id}/qr-code`]);
  }

  toQrScanner() {
    this.router.navigate([`/qr-scanner`]);
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
    let decoded = jwt_decode(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    this.httpClient.get(`https://messaging.api.whatwechat.net/deliveries?optionsSelectedAt[exists]=true&selectedOptionsReadAt[exists]=false&message.sender.uuid=${decoded.im}&groupByMessage=true`, httpOptions)
      .subscribe(res => {
        const recentAnnouncementCount = +res['hydra:member'].length;
        if (this.recentAnnouncementCount !== recentAnnouncementCount) {
          this.countSide -= this.recentAnnouncementCount;
          this.countSide += recentAnnouncementCount;
          this.recentAnnouncementCount = recentAnnouncementCount;
        }
      });

    if (this.checkingRole(true)) {
      this.service.getMessage(1, '&type=simple&senderMessageAdmin=false&approvalDecidedAt[exists]=false').subscribe(res => {
        const approvalCount = +res['hydra:totalItems'];
        if (this.approvalCount !== approvalCount) {
          this.countSide -= this.approvalCount;
          this.countSide += approvalCount;
          this.approvalCount = approvalCount;
        }
      });
    } else {
      this.service.getMessage(1, '&type=simple&senderMessageAdmin=false&approvalDecidedAt[exists]=true,approvalDecisionReadAt[exists]=false').subscribe(res => {
        const approvalCount = +res['hydra:totalItems'];
        if (this.approvalCount !== approvalCount) {
          this.countSide -= this.approvalCount;
          this.countSide += approvalCount;
          this.approvalCount = approvalCount;
        }
      });
    }
  }

  getSubdomain() {
    var host = window.location.hostname;
    var parts = host.split('.');
    this.sub = parts[0];
    console.log(parts);
    if (parts.length > 2) {
      if (parts[0] === 'www') {
        this.showOrg = true;
      } else {
        this.sub = parts[0];
        this.showOrg = false;
      }
    } else if (parts.length < 2) {
      this.showOrg = true;
    }
  }

  /* LOGIN BY SUBDOMAIN */
  getLogoOrganisation() {
    // if (!this.showOrg) {
    this.service.G_OrgByUuid(this.decoded.org)
      .subscribe(res => {
        console.log('logo', res);
        this.orgLogo = res['hydra:member'][0]['logoReadUrl'];
        /* Dynamic Manifest */
        let paramsDataManifest = {
          logo: this.orgLogo,
          name: this.sub,
          host: document.location.host
        };

        /* check server image */
        this.httpClient.get(this.orgLogo)
          .subscribe(res => {

          }, err => {
            if (err.status === 404) {
              this.orgLogo = '/assets/img-process/Not-found-img.gif';

            }
          });
      }, error => {
        if (error.status === 404) {
          this.orgLogo = './assets/img-process/Not-found-img.gif';
          // this.error = 'Organisation not found'
        }
        if (error.status === 500) {
          // this.error = error.error.delivery;
        }
      });
    // }

  }
}
