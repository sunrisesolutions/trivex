import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "info",
  templateUrl: "./memberid.component.html",
  styleUrls: ["./memberid.component.scss"]
})
export class MemberidComponent implements OnInit {
  constructor(
    private service: PostService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}
  id;
  imId;
  members;
  tokenRes = false;
  cToken;
  ngOnInit() {
    this.cToken = localStorage.getItem("token");
    if (this.cToken == localStorage.getItem("token")) {
      this.tokenRes = true;
    }

    const snapID = +this.routes.snapshot.paramMap.get("id");
    this.id = snapID;
    this.imId = localStorage.getItem("im_id");
    this.service.getRootID(snapID).subscribe(res => {
      let getInfo = res.json();
      this.members = [getInfo];
      console.log("info user", res.json());
    });
  }

  toClubMem() {
    this.router.navigate(["club-members"]);
  }
  injectNumber(s) {
    return s.substring(s.lastIndexOf("/") + 1);
  }
}
