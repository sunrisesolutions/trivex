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

  ngOnInit() {
    this.service.getConnect().subscribe(res => {
      let get = res.json()["hydra:member"]
      
      console.log(get);
      this.members = get;
    });
  }
  
  send() {
    alert('Sent!');
  }
}
