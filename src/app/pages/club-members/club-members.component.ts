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
  members;
  id;
  posts: any[];
  uHide = false;
  dec;
  uToken;
  constructor(private service: PostService, private router: Router) {}

  ngOnInit() {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    this.service.getDataAPI().subscribe(res => {
      this.dec = decoded.im;
      console.log(this.dec);

      this.members = res.json();
      console.log('member array',this.members)
    });
  }

  injectNumber(s) {
    return s.substring(s.lastIndexOf("/") + 1);
  }
}

/*
const formRef = new FormData();
let date = ~~(Date.now() / 1000);
      console.log(date);
      let ref = response.json().refresh_token;
      formRef.append("refresh_token", ref);
      console.log(ref); */
