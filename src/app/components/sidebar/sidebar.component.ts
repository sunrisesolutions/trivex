import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public exampleMenuItems: any[];
  public isCollapsed = true;
  uID;
  img;
  members;
  constructor(private router: Router, private service: PostService) {}

  ngOnInit() {
    this.service.getDataAPI().subscribe(res => {
      this.uID = localStorage.getItem("im_id");
      this.service.getRootID(this.uID).subscribe(res => {
        let getInfo = res.json().profilePicture;
        this.members = getInfo;
        console.log("info user", res.json());
      });
    });

    this.menuItems = ROUTES;
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }
  toInfo() {
    this.router.navigate([`club-members/${this.uID}/info`]);
  }
  toQrCode() {
    this.router.navigate([`club-members/${this.uID}/qr-code`]);
  }
  logout() {
    localStorage.clear();
  }
}
