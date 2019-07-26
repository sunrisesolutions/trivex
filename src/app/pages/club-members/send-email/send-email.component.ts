import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams, HttpClient } from "@angular/common/http";
import { OrganisationService } from "../../../services/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  constructor(
    private service: PostService,
    private orgService: OrganisationService,
    private router: Router,
    private routes: ActivatedRoute,
    public httpClient: HttpClient
  ) { }
  member;
  loading = false;
  subject = '';
  body = '';
  error = '';
  success = false;

  ngOnInit() {
    const id = +this.routes.snapshot.paramMap.get('id');
    this.service.getRootID(id).subscribe(res => {
      let getInfo = res;
      this.member = getInfo;
      this.httpClient.get(this.member['profilePicture'])
        .subscribe(res => {
        }, error => {
          if (error.status === 404) {
            this.member['profilePicture'] = 'https://i.gifer.com/B0eS.gif'
          }
        })
    });
  }

  send() {
    this.loading = true;
    let memberId = this.member['@id'];

    let id = memberId.substring(memberId.lastIndexOf('/') + 1);
    this.orgService.connectToMember(id, this.subject, this.body).subscribe(res => {
      this.loading = false;
      this.success = true;
      console.log(res)
    }, err => {
      this.error = err.error['hydra:description'];
      this.loading = false;
    });
  }
  toClubMem() {
    this.router.navigate(["club-members"]);
  }
}
