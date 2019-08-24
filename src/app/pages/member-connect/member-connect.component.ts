import {ActivatedRoute} from '@angular/router';
import {PostService} from 'src/app/services/post.service';
import {Component, OnInit} from '@angular/core';
// import 'rxjs-compat/add/operator/do';
import * as jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {Delivery} from 'src/app/models/Deliveries';
import {HttpClient} from '@angular/common/http';
import {SearchService} from 'src/app/services/search.service';
import 'rxjs/add/operator/do';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {isNumber} from 'util';

@Component({
  selector: 'app-member-connect',
  templateUrl: './member-connect.component.html',
  styleUrls: ['./member-connect.component.scss']
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
      console.log(s);
      /*  s = s.match(/\d+/)[0];
       return s; */
    }
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    this.dec = decoded;
    // console.log('dec',decoded.im);
    // this.scrollCallback = this.getConnect.bind(this);
  }


  getConnect(textSearch: String = null) {
    let endpoint = `/connections?page=${this.currentPage}`;
    // console.log('4');
    var im_id = '/individual_members/' + localStorage.getItem('im_id');
    console.log('im_id is ' + im_id);
    if (textSearch !== null) {
      this.loadingSearch = false;
      endpoint = `/connections?fulltextString=${textSearch}`;
      return this.service.getConnect(endpoint)
        .subscribe(res => {
          this.loadingSearch = true;
          if (res['hydra:member']) {
            this.members = res['hydra:member'];
            for (let data of this.members) {
              // console.log('3333');
              data['profilePicture'] = '/assets/img-process/Loading-img.gif';
              data['fromId'] = (data['fromMember']['@id']);
              data['toId'] = (data['toMember']['@id']);
              if (data['fromId'] === data['toId']) {
                data['data'] = null;
                data['route'] = null;
              } else if (data['fromId'] === im_id) {
                data['data'] = data['personData']['to'];

                this.service.getRootByFullID(data['toMember'])
                  .subscribe(res => {
                    data['profilePicture'] = (res['profilePicture'] === null) ? '/assets/img-process/Not-found-img.gif' : res['profilePicture'];
                    if (res['profilePicture']) {
                      this.httpClient.get(res['profilePicture'])
                        .subscribe(res => {

                        }, err => {
                          if (err.status === 404) {
                            data['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                          }
                        });
                    }
                  });
                data['route'] = data['toMember']['@id'];
              } else if (data['toId'] === im_id) {
                data['data'] = data['personData']['from'];
                data['route'] = data['fromId'];
              }
            }
          }
        });
    } else {
      return this.service.getConnect(endpoint)
        .do(this.processData);
    }

  }

  processData = (mainData) => {
    this.loadingSearch = true;
    this.currentPage++;
    // console.log('1');
    var im_id = '/individual_members/' + localStorage.getItem('im_id');

    // JSON.stringify(news
    let members  = this.members = this.members.concat(mainData['hydra:member']);
    // console.log('processing data ', mainData, this.members)

    console.log('hey man nnn', members);
    for (let data of members) {
      // data['profilePicture'] = '/assets/img-process/Loading-img.gif';
      // console.log('2', data);
      data['fromId'] = (data['fromMember']['@id']);
      data['toId'] = (data['toMember']['@id']);
      if (data['fromId'] === data['toId']) {
        data['data'] = null;
        data['route'] = null;
      }
      if (data['fromId'] === im_id) {
        data['data'] = data['personData']['to'];
        this.service.getRootByFullID(data['toMember']['@id'])
          .subscribe(res => {
            data['profilePicture'] = (res['profilePicture'] === null) ? '/assets/img-process/Not-found-img.gif' : res['profilePicture'];
            if (res['profilePicture']) {
              this.httpClient.get(res['profilePicture'])
                .subscribe(res => {

                }, err => {
                  if (err.status === 404) {
                    data['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                  }
                });
            }
          });
        // console.log('data route is ', data);
        data['route'] = `/individual_members/${data['toId']}`;
      } else if (data['toId'] === im_id) {
        data['data'] = data['personData']['from'];
        data['route'] = data['toId'];
      }
      // console.log('echoing member', data, im_id);
    }
    // console.log('end of process data', members);
  };

  open(content) {
    if (content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true});
      // this.delivery = delivery;
    }
  }
}

export class Member {
  memberCallback: {
    personData: {}
  };
}
