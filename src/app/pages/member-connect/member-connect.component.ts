import { ActivatedRoute } from '@angular/router';
import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
// import 'rxjs-compat/add/operator/do';
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
    var im_id = this.injectNumber(localStorage.getItem('im_id'));
    if (textSearch !== null) {
      this.loadingSearch = false;
      endpoint = `/connections?fulltextString=${textSearch}`
      return this.service.getConnect(endpoint)
        .subscribe(res => {
          this.loadingSearch = true;
          if (res['hydra:member']) {
            this.members = res['hydra:member'];
            for (let data of this.members) {
              data['profilePicture'] = '/assets/img-process/Loading-img.gif';
              data['fromId'] = this.injectNumber(data['fromMember']['@id']);
              data['toId'] = this.injectNumber(data['toMember']['@id']);
              if (data['fromId'][0] === data['toId'][0]) {
                data['data'] = null;
                data['route'] = null;
              } else if (data['fromId'][0] === im_id[0]) {
                data['data'] = data['personData']['to'];

                this.service.getRootID(data['toMember'])
                  .subscribe(res => {
                    data['profilePicture'] = (res['profilePicture'] === null) ? '/assets/img-process/Not-found-img.gif' : res['profilePicture'];
                    if (res['profilePicture']) {
                      this.httpClient.get(res['profilePicture'])
                        .subscribe(res => {

                        }, err => {
                          if (err.status === 404) {
                            data['profilePicture'] = '/assets/img-process/Not-found-img.gif'
                          }
                        })
                    }
                  })
                data['route'] = `/individual_members/${data['toMember']}`;
              } else if (data['toId'][0] === im_id[0]) {
                data['data'] = data['personData']['from'];
                data['route'] = `/individual_members/${data['fromId'][0]}`;
              }
            }
          }
        })
    } else {
      return this.service.getConnect(endpoint)
        .do(this.processData)
    }

  }
  processData = (mainData) => {
    this.loadingSearch = true;
    this.currentPage++;
    var im_id = this.injectNumber(`${localStorage.getItem('im_id')}`);
    console.log(im_id)
    // JSON.stringify(news)
    this.members = this.members.concat(mainData['hydra:member']);
    for (let data of this.members) {
      data['profilePicture'] = '/assets/img-process/Loading-img.gif';
      data['fromMember']['id'] = data['fromMember']['@id'];
      data['toMember']['id'] = data['toMember']['@id'];
      data['fromId'] = data['fromMember']['id'].match(/\d+/g).map(Number);
      data['toId'] = data['toMember']['id'].match(/\d+/g).map(Number);
      if (data['fromId'][0] === data['toId'][0]) {
        data['data'] = null;
        data['route'] = null;
      } if (data['fromId'][0] === im_id[0]) {
        data['data'] = data['personData']['to'];

        this.service.getRootID(data['toId'][0])
          .subscribe(res => {
            data['profilePicture'] = (res['profilePicture'] === null) ? '/assets/img-process/Not-found-img.gif' : res['profilePicture'];
            if (res['profilePicture']) {
              this.httpClient.get(res['profilePicture'])
                .subscribe(res => {

                }, err => {
                  if (err.status === 404) {
                    data['profilePicture'] = '/assets/img-process/Not-found-img.gif'
                  }
                })
            }
          })
        data['route'] = `/individual_members/${data['toId'][0]}`;
      }// else if (data['toId'][0] === im_id[0]) {
      //   data['data'] = data['personData']['from'];
      //   data['route'] = `/individual_members/${data['toId'][0]}`;
      // }
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
