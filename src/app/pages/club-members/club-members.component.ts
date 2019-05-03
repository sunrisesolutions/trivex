import { Router } from "@angular/router";
import { PostService } from "./../../services/post.service";
import { Component, OnInit, HostBinding } from "@angular/core";
import { Member } from "src/app/models/Member";
import { HttpParams } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";


@Component({
  selector: "app-club-members",
  templateUrl: "./club-members.component.html",
  styleUrls: ["./club-members.component.scss"]
})
export class ClubMembersComponent implements OnInit {
  members = [];
  id;
  posts: any[];
  uHide = false;
  dec;
  uToken;
  constructor(private service: PostService, private router: Router) {}

  ngOnInit() {
    this.service.getDataAPI().subscribe(res => {
      let token = localStorage.getItem("token");
      let decoded = jwt_decode(token);
      this.dec = decoded.im;

      
      let getMem = res.json()["hydra:member"];
      this.members = getMem;
    });
  }

  injectNumber(s) {
    return s.substring(s.lastIndexOf('/') + 1);
  }
}
