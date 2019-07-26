import { ActivatedRoute } from '@angular/router';
import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
import 'rxjs-compat/add/operator/do';
import * as jwt_decode from "jwt-decode";
@Component({
  selector: "app-member-connect",
  templateUrl: "./member-connect.component.html",
  styleUrls: ["./member-connect.component.scss"]
})
export class MemberConnectComponent implements OnInit {
  showForm = false;
  members: Array<any>[] = [];
  imId;
  dec;
  currentPage = 1;
  scrollCallback;

  constructor(private service: PostService,private routes: ActivatedRoute) {
    this.scrollCallback = this.getConnect.bind(this);

  }

  injectNumber(s) {
    return s.substring(s.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    let token = localStorage.getItem("token");
    let decoded = jwt_decode(token);
    this.dec = decoded.im;
    console.log(decoded.im)
  }
  getConnect() {
    return this.service.getConnect(this.currentPage)
      .do(res => {
        this.currentPage++;
        console.log('fixed',res)
        // JSON.stringify(news)
        this.members = this.members.concat(res['hydra:member'])
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
