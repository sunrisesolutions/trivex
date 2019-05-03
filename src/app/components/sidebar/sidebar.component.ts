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
    title: "Member Connections",
    icon: "ni-planet text-blue",
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
  constructor(private router: Router, private service: PostService) {}

  ngOnInit() {
    this.service.getDataAPI().subscribe(res => {
      console.log("nav here", res.json());
      let getImg = res.json()["hydra:member"]
      this.img = 
      this.uID = localStorage.getItem('im_id');
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
