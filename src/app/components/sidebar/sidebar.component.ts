import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SwPush } from "@angular/service-worker";
import { PushNotificationService } from "src/app/services/post-notif.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/club-members",
    title: "Club Members",
    icon: "ni-bullet-list-67 text-red",
    class: ""
  },
  {
    path: "/member-connect",
    title: "Members I have met",
    icon: "ni-planet text-blue",
    class: ""
  },
  {
    path: "/post-announcement",
    title: "Post an announcement",
    icon: "ni-bell-55 text-yellow",
    class: ""
  }
];

let VAPID_SERVER_KEY = "BAaWnIATw3HP0YMkQO6vehCxQixCA8V7odcu2cxgEYVEjDu2Ghj6HBKjracCeFKaV38vBsSAz4_yYCW7I6XYRPs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public exampleMenuItems: any[];
  public isCollapsed = true;
  uuid;
  img;
  members;
  messages;
  countMess;
  idDelete: any;
  publicKey: any;
  status = false;
  getId;
  constructor(private router: Router, private service: PostService,
    private swPush: SwPush,
    private reqNotif: PushNotificationService,
  ) { }

  ngOnInit() {
    this.service.getDataAPI().subscribe(res => {
      this.uuid = localStorage.getItem("im_id");
      this.service.getRootID(this.uuid).subscribe(res => {
        let getInfo = res.json().profilePicture;
        this.members = getInfo;
        console.log("info user", res.json());
      });
    });

    // change status
    if (localStorage.getItem('id_pushNotif') || localStorage.getItem('public_key')) {
      this.status = true;
    } else {
      this.status = false;
    }
    // =============

    this.menuItems = ROUTES;
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
    // get messages
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
    this.router.navigate([`/club-members/${this.uuid}/info`]);

  }
  toQrCode() {
    this.router.navigate([`club-members/${this.uuid}/qr-code`]);
  }
  logout() {
    localStorage.clear();
  }
  // notif
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
