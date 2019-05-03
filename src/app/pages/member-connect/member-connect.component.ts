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
    let id;
    this.service.getDataAPI().subscribe(response => {
      let get = response.json()["hydra:member"]["0"]["@id"];
      id = get;
      this.getRootID(id);
    });
  }
  
  getRootID(id) {
    this.service.getRootID(id).subscribe(res => {
      console.log(res.json().personData);
      let getDATA = res.json().personData;
      this.members = [getDATA];
    });
  }

  send() {
    alert('Sent!');
  }
}
