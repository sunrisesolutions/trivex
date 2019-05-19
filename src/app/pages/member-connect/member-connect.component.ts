import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-member-connect",
  templateUrl: "./member-connect.component.html",
  styleUrls: ["./member-connect.component.scss"]
})
export class MemberConnectComponent implements OnInit {
  showForm = false;
  members;
  imId;
  dec;
  
  constructor(private service: PostService) {}

  injectNumber(s) {
    return s.substring(s.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    this.service.getConnect().subscribe(res => {
      
      let token = localStorage.getItem("token");
      let decoded = jwt_decode(token);
      this.dec = decoded.im;
      console.log(decoded.im)

      let get = res.json()["hydra:member"];
      console.log(get);
      this.members = get;
    });
  }
}
