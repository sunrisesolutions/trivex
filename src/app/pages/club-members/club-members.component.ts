import { Router, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { PostService } from "./../../services/post.service";
import { Component, OnInit, HostBinding, ViewChild, AfterViewInit } from "@angular/core";
import { Member } from "src/app/models/Member";
import { HttpParams, HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { SearchService } from "src/app/services/search.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import 'rxjs/add/operator/do';

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
            this.service.getPersonByUuid(member['personData'].uuid)
              .subscribe(res => {
                member['alternateName'] = res['hydra:member'][0].alternateName;
                member['person'] = res['hydra:member'][0];
              })
            if (member['profilePicture']) {
              this.httpClient.get(member['profilePicture'])
                .subscribe(res => {

                }, err => {
                  if (err.status === 404) {
                    member['profilePicture'] = 'assets/img-process/Not-found-img.gif';
                  }
                })
            } else {
              member['profilePicture'] = 'assets/img-process/Not-found-img.gif';
            }
          }
        })
    } else {
      return this.service.getDataAPI(`?page=${this.currentPage}`).do(res => {
        console.log(res)
        this.loadingSearch = true;
        this.currentPage++;
        this.dec = this.decoded.im;
        this.members = this.members.concat(res['hydra:member']);

        for (const member of this.members) {
          this.service.getPersonByUuid(member.personData.uuid)
            .subscribe(res => {
              member['alternateName'] = res['hydra:member'][0].alternateName;
              member['person'] = res['hydra:member'][0];
            })
          if (member['profilePicture']) {
            this.httpClient.get(member['profilePicture'])
              .subscribe(res => {

              }, err => {
                if (err.status === 404) {
                  member['profilePicture'] = 'assets/img-process/Not-found-img.gif';
                }
              })
          } else {
            member['profilePicture'] = 'assets/img-process/Not-found-img.gif';
          }
        }
        console.log(this.members);
      });
    }



  }
  test(event) {
    console.log(event);
  }
  open(content) {
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      // this.delivery = delivery;
    }
  }

}
