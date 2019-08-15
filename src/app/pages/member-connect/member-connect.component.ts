import { ActivatedRoute } from '@angular/router';
import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
import 'rxjs-compat/add/operator/do';
import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { Delivery } from 'src/app/models/Deliveries';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'src/app/services/search.service';
import 'rxjs/add/operator/do';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isNumber } from 'util';
@Component({
  selector: "app-member-connect",
  templateUrl: "./member-connect.component.html",
  styleUrls: ["./member-connect.component.scss"]
})

export class MemberConnectComponent implements OnInit {
  showForm = false;
  loadingSearch = false;
  members: Array<any> = [];
  imId;
  textSearch = null;
  dec;
  currentPage = 1;
  scrollCallback;
  constructor(private service: PostService, public modalService: NgbModal, private routes: ActivatedRoute, public httpClient: HttpClient) {
    this.scrollCallback = this.getConnect.bind(this);
  }

  injectNumber(s) {
    if (s) {
      s = s.toString();
      return s.match(/\d+/g).map(Number);
    }
  }

  ngOnInit() {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    this.dec = decoded;
    // console.log('dec',decoded.im);
    // this.scrollCallback = this.getConnect.bind(this);
  }


  getConnect(textSearch: String = null) {
    let endpoint = `/connections?page=${this.currentPage}`;
    if (textSearch !== null) {
      this.loadingSearch = false;
      endpoint = `/connections?fulltextString=${textSearch}`
      return this.service.getConnect(endpoint)
        .subscribe(res => {
          this.loadingSearch = true;
          if (res['hydra:member']) {
            this.members = res['hydra:member'];
            for (const data of this.members) {
              if (data['fromMember'] === data['toMember']) {
                data['data'] = null;
                data['route'] = null;
              } else if (data['fromMember'] === localStorage.getItem('im_id')) {
                data['data'] = data['personData']['to'];
                data['route'] = data['toMember'];
              } else if (data['toMember'] === localStorage.getItem('im_id')) {
                data['data'] = data['personData']['from'];
                data['route'] = data['fromMember']
              }
            }
          }
        })
    } else {
      return this.service.getConnect(endpoint)
        .do(this.processData)
    }

  }
  processData = (data) => {
    this.loadingSearch = true;
    this.currentPage++;
    var im_id = this.injectNumber(localStorage.getItem('im_id'));
    // JSON.stringify(news)
    this.members = this.members.concat(data['hydra:member']);
    for (let data of this.members) {
      data['profilePicture'] = 'https://i.ya-webdesign.com/images/peach-svg-animated-6.gif';
      data['fromMember'] = this.injectNumber(data['fromMember']);
      data['toMember'] = this.injectNumber(data['toMember'])
      if (data['fromMember'][0] === data['toMember'][0]) {
        data['data'] = null;
        data['route'] = null;
      } else if (data['fromMember'][0] === im_id[0]) {
        data['data'] = data['personData']['to'];

        this.service.getRootID(data['toMember'])
          .subscribe(res => {
            data['profilePicture'] = res['profilePicture'];
            this.httpClient.get(data['profilePicture'])
              .subscribe(res => {

              }, err => {
                if (err.status === 404) {
                  data['profilePicture'] = 'assets/img-process/Not-found-img.gif'
                }
              })
          })
        data['route'] = `/individual_members/${data['toMember']}`;
      } else if (data['toMember'][0] === im_id[0]) {
        data['data'] = data['personData']['from'];
        data['route'] = `/individual_members/${data['fromMember']}`;
      }
    }
    console.log(this.members)
  };
  open(content) {
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      // this.delivery = delivery;
    }
  }
}

export class Member {
  memberCallback: {
    personData: {

    }
  }
}
