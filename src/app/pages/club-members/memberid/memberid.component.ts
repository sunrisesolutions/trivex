import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "info",
  templateUrl: "./memberid.component.html",
  styleUrls: ["./memberid.component.scss"]
})
export class MemberidComponent implements OnInit {
  constructor(
    private service: PostService,
    private router: Router,
    private routes: ActivatedRoute,
    public http: HttpClient
  ) {
    this.routes.params.subscribe(val => {
      this.getRootId();
    })
  }
  id;
  imId;
  members: Object = {
    personData:{
      name: ''
    }
  }
  tokenRes = false;
  cToken;
  member;
  ngOnInit() {
    this.getRootId();

    this.cToken = localStorage.getItem("token");
    if (this.cToken == localStorage.getItem("token")) {
      this.tokenRes = true;
    }


  }
  getRootId() {
    let snapID;
    snapID = this.routes.snapshot.params.id;
    this.id = snapID;
    this.imId = localStorage.getItem("im_id").match(/\d+/g).map(Number).toString();
    this.members['profilePicture'] = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif';
    this.service.getRootID(snapID).subscribe(res => {
      this.members = res;

      this.members['@id'] = this.members['@id'].match(/\d+/g).map(Number);
      console.log(this.members);
      this.http.get(this.members['profilePicture'])
        .subscribe(res => {
        }, error => {
          if (error.status === 404) {
            this.members['profilePicture'] = 'https://i.gifer.com/B0eS.gif'
          }
        })
    });
  }
  toClubMem() {
    this.router.navigate(["club-members"]);
  }
  injectNumber(s) {
    return s.substring(s.lastIndexOf("/") + 1);
  }
}
