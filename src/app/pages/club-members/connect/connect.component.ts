import { Component, OnInit } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-connect",
  templateUrl: "./connect.component.html",
  styleUrls: ["./connect.component.scss"]
})
export class ConnectComponent implements OnInit {
  constructor(private service: PostService) {}
  id;
  status;
  members;
  ngOnInit() {
    this.service.getDataAPI().subscribe(res => {
      console.log(res.json());
      let get = res.json()["hydra:member"]["0"];
      console.log(get);
      this.members = [get.personData];
      this.id = get["@id"];
    });
    this.onConnect();
  }
  onConnect() {
    const id = new HttpParams();
    id.set("toMember", JSON.stringify(this.id));
    this.service.uConnect(id).subscribe(response => {
      console.log(response);
      if(response.status === 201){
        this.status = "You have connected to this person.";
      }
    });
  }
}
