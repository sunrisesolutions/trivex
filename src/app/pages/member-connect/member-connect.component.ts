import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-member-connect",
  templateUrl: "./member-connect.component.html",
  styleUrls: ["./member-connect.component.scss"]
})
export class MemberConnectComponent implements OnInit {
  showForm = false;
  members;
  constructor(private service: PostService) {}

  injectNumber(s) {
    return s.substring(s.lastIndexOf('/') + 1);
  }

  ngOnInit() {
    this.service.getConnect().subscribe(res => {
      let get = res.json()["hydra:member"];
      
      this.members = get;
    });
  }
}
