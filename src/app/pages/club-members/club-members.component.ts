import { Router, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
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
  members: Array<any> = [];
  id;
  posts: any[];
  uHide = false;
  dec;
  uToken;
  currentPage = 1;
  scrollCallback;
  constructor(private service: PostService, private router: Router,private routes: ActivatedRoute) {
    this.scrollCallback = this.getMembers.bind(this);

  }
  token;
  decoded;
  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.decoded = jwt_decode(this.token);

  }

  injectNumber(s) {
    return s.substring(s.lastIndexOf("/") + 1);
  }
  getMembers() {
    return this.service.getDataAPI(this.currentPage).do(res => {
      this.currentPage++;
      this.dec = this.decoded.im;
      console.log(this.dec);

      this.members = this.members.concat(res['hydra:member']);

    });
  }
}
