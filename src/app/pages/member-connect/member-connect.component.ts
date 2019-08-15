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
            let imId = localStorage.getItem('im_id');
            if(imId.indexOf('individual_members') === -1){
              imId = '/individual_members/' + imId;
            } ;
            for (const data of this.members) {
              if (data['fromMember'] === data['toMember']) {
                data['data'] = null;
                data['route'] = null;
              } else if (data['fromMember'] === imId) {
                data['data'] = data['personData']['to'];
                data['route'] = data['toMember'];
              } else if (data['toMember'] === imId) {
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
    // JSON.stringify(news)
    this.members = this.members.concat(data['hydra:member']);
    for (let data of this.members) {
      if (data['fromMember'] === data['toMember']) {
        data['data'] = null;
        data['route'] = null;
      }
      else if (data['fromMember'] === localStorage.getItem('im_id')) {
        data['data'] = data['personData']['to'];
        data['route'] = data['toMember'];
      }
      else if (data['toMember'] === localStorage.getItem('im_id')) {
        data['data'] = data['personData']['from'];
        data['route'] = data['fromMember']
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
