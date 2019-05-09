import { Component, OnInit, Input } from "@angular/core";
import { PostService } from "../../services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";
import { OrganisationService } from "../../services/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-post-announcement',
  templateUrl: './post-announcement.component.html',
  styleUrls: ['./post-announcement.component.scss']
})
export class PostAnnouncementComponent {
  constructor(
    private service: PostService,
    private orgService: OrganisationService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}
  member;
  loading = false;
  subject = '';
  body = '';
  error = '';
  success = false;

  
  send() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.success = true;
    }, 500);
  }
}
