import { Router, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { PostService } from "./../../services/post.service";
import { Component, OnInit, HostBinding, ViewChild, AfterViewInit } from "@angular/core";
import { Member } from "src/app/models/Member";
import { HttpParams, HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { SearchService } from "src/app/services/search.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-club-members",
  templateUrl: "./club-members.component.html",
  styleUrls: ["./club-members.component.scss"]
})
export class ClubMembersComponent implements OnInit {
  /* Params text search */
  textSearch = null;
  loadingSearch = false;
  /* Params text search */

  members: Array<any> = [];
  id;
  posts: any[];
  uHide = false;
  dec;
  uToken;
  currentPage = 1;
  scrollCallback;
  constructor(public modalService: NgbModal, public receiveTextSearch: SearchService, private service: PostService, private router: Router, private routes: ActivatedRoute, public httpClient: HttpClient) {
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
  getMembers(textSearch: String = null) {
    if (textSearch !== null) {
      this.loadingSearch = false;
      return this.service.getDataAPI(`?fulltextString=${textSearch}`)
        .subscribe(res => {
          this.members = res['hydra:member'];
          this.loadingSearch = true;
          for (const member of this.members) {
            this.httpClient.get(member['profilePicture'])
              .subscribe(res => {

              }, err => {
                if (err.status === 404) {
                  member['profilePicture'] = 'notFoundImage';
                }
              })
          }
        })
    }else {
      return this.service.getDataAPI(`?page=${this.currentPage}`).do(res => {
        this.loadingSearch = true;
        this.currentPage++;
        this.dec = this.decoded.im;
        this.members = this.members.concat(res['hydra:member']);
        console.log(this.members);

        for (const member of this.members) {
          this.httpClient.get(member['profilePicture'])
            .subscribe(res => {

            }, err => {
              if (err.status === 404) {
                member['profilePicture'] = 'notFoundImage';
              }
            })
        }

      });
    }



  }
  test(event){
    console.log(event);
  }
  open(content) {
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      // this.delivery = delivery;
    }
  }

}
