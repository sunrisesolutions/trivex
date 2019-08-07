import { ActivatedRoute } from '@angular/router';
import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
import 'rxjs-compat/add/operator/do';
import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { Delivery } from 'src/app/models/Deliveries';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "app-member-connect",
  templateUrl: "./member-connect.component.html",
  styleUrls: ["./member-connect.component.scss"]
})


export class MemberConnectComponent implements OnInit {
  showForm = false;
  loadingSearch = false;
  members: Array<any>[]=[];
  imId;
  textSearch = '';
  dec;
  currentPage = 1;
  scrollCallback;

  constructor(private service: PostService, private routes: ActivatedRoute, public httpClient: HttpClient) {

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
    // console.log('dec',decoded.im)
    this.getConnect;
  }
  getConnect(search) {
    this.service.getConnect(`${localStorage.getItem('im_id')}/to_connections`)
      .subscribe(res => {
        this.members = res['hydra:member'];
        console.log(this.members)
        for (let data of this.members) {
          this.service.getConnect(data['toMember'])
            .subscribe(res => {
              data['memberCallback'] = res;
              data['memberCallback']['id'] = data['memberCallback']['@id'];
              this.httpClient.get(data['memberCallback'].profilePicture)
                .subscribe(res => {

                }, err => {
                  if (err.status === 404) {
                    data['memberCallback'].profilePicture = '/assets/img-process/Not-found-img.gif';
                  }
                })
            })
        }

      })
  }
  /* test() {
    return this.service.getConnect(this.currentPage)
      .subscribe(res => {
        // JSON.stringify(news)
        this.members = this.members.concat(res['hydra:member'])
      })
  } */
}

export class Member {
  memberCallback: {
    personData: {

    }
  }
}
