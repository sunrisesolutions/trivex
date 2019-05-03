import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "info",
  templateUrl: "./memberid.component.html",
  styleUrls: ["./memberid.component.scss"]
})
export class MemberidComponent implements OnInit {
  constructor(private service: PostService, private router: Router) {}
  id;
  members;
  tokenRes = false;
  cToken;
  ngOnInit() {
    this.cToken = localStorage.getItem("token");
    if (this.cToken == localStorage.getItem("token")) {
      this.tokenRes = true;
    }
    
    this.id = localStorage.getItem('im_id')
    this.service.getRootID(this.id).subscribe(res => {
      let getInfo = res.json();
      this.members = [getInfo];
      console.log("info user",res.json());
    });
  }

  toClubMem() {
    this.router.navigate(["club-members"]);
  }
}
