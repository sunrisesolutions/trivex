import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";
import { OrganisationService } from "../../../services/organisation.service";
import { Router } from "@angular/router";

@Component({
  selector: "info",
  templateUrl: "./memberid.component.html",
  styleUrls: ["./memberid.component.scss"]
})
export class MemberidComponent implements OnInit {
  constructor(
    private service: PostService,
    private orgService: OrganisationService,
    private router: Router
  ) {}
  id;
  member;
  loading = false;
  error = '';

  ngOnInit() {
    this.service.getDataAPI().subscribe(response => {
      let get = response.json()["hydra:member"]["0"]["@id"];
      this.id = get;
      this.getRootID(this.id);
    });
  }

  getRootID(id) {
    this.service.getRootID(id).subscribe(res => {
      console.log(res.json().personData);
      let getDATA = res.json().personData;
      this.member = getDATA;
    });
  }
  
  send() {
    this.loading = true;
    this.orgService.connectToMember(this.id).subscribe(res => {
      this.loading = false;
      this.router.navigate([`/club-members/${this.id}/connect`]);
    }, err => {
      this.error = err.error['hydra:description'];
      this.loading = false;
    });
  }
}
