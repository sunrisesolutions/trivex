import { PostService } from "./../../services/post.service";
import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  members;
  uID;
  id;
  constructor(
    location: Location,
    private service: PostService,
    private element: ElementRef,
    private router: Router
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.id = localStorage.getItem("im_id");
    this.service.getRootID(this.id).subscribe(res => {
      let getInfo = res.json();
      this.members = [getInfo];
      console.log("info user", res.json());
    });
  }
  toInfo() {
    let id = this.id;
    this.router.navigate([`club-members/${id}/info`]);
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
    return "Dashboard";
  }
  logout() {
    localStorage.clear();
  }
}
