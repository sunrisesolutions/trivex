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
  loading = true;
  subject = '';
  body = '';
  error = '';
  success = false;

  ngOnInit() {
    this.getInfo()
  }
  getInfo() {
    const id = +this.routes.snapshot.paramMap.get('id');
    this.service.getRootID(id).subscribe(res => {
      let getInfo = res;

      this.member = getInfo;
      for (let m of [this.member]) {
        this.service.getPersonByUuid(m.personData.uuid)
          .subscribe(res => {
            let nowYear = new Date().getFullYear();
            m['person'] = res['hydra:member'][0];
            let yearMember = m['person']['birthDate'].split('T')[0].split('-')[0];
            m['person']['yearOld'] = nowYear - yearMember;
            m['person']['alternateName'] = m['person']['alternateName']
          })
        if (m['profilePicture']) {
          this.httpClient.get(m['profilePicture'])
            .subscribe(res => {

            }, err => {
              if (err.status === 404) {
                m['profilePicture'] = 'assets/img-process/Not-found-img.gif';
              }
            })
        } else {
          m['profilePicture'] = 'assets/img-process/Not-found-img.gif';
        }
      }
      setTimeout(() => {
        this.loading = false;

      }, 2000)
      console.log(this.member)
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
