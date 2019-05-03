import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "info",
  templateUrl: "./memberid.component.html",
  styleUrls: ["./memberid.component.scss"]
})
export class MemberidComponent implements OnInit {
  constructor(private service: PostService) {}
  id;
  members;
  ngOnInit() {
    let id;
    this.service.getDataAPI().subscribe(response => {
      let get = response.json()["hydra:member"]["0"]["@id"];
      id = get;
      this.getRootID(id);
    });
  }

  getRootID(id) {
    this.service.getRootID(id).subscribe(res => {
      console.log(res.json().personData);
      let getDATA = res.json().personData;
      this.members = [getDATA];
    });
  }
  
  send() {
    alert('Sent!');
  }
}
