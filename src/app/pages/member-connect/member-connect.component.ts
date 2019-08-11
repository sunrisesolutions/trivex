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
  textSearch = '';
  dec;
  currentPage = 1;
  scrollCallback;
  constructor(private service: PostService,public modalService: NgbModal, private routes: ActivatedRoute, public httpClient: HttpClient) {
    this.scrollCallback = this.getConnect.bind(this);
  }

  injectNumber(s) {
    if (s) {
      return s.match(/\d+/g).map(Number);
    }
  }

  ngOnInit() {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    this.dec = decoded;
    // console.log('dec',decoded.im);
    // this.scrollCallback = this.getConnect.bind(this);
  }

  getConnect(textSearch: String = '') {
    return this.service.getConnect(`${localStorage.getItem('im_id')}/to_connections?page=${this.currentPage}`)
      .do(this.processData)
  }
  processData = (data) => {
    this.loadingSearch = true;
    this.currentPage++;
    // JSON.stringify(news)
    this.members = this.members.concat(data['hydra:member']);
    console.log(this.members)
  };
  /* test() {
    return this.service.getConnect(this.currentPage)
      .subscribe(res => {
        // JSON.stringify(news)
        this.members = this.members.concat(res['hydra:member'])
      })
  } */
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
