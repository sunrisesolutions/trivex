import { Router } from "@angular/router";
import { PostService } from "./../../services/post.service";
import { Component, OnInit, HostBinding } from "@angular/core";
import { Member } from "src/app/models/Member";
import { HttpParams } from "@angular/common/http";
export const MEMBERS: Member[] = [
  
];

@Component({
  selector: "app-club-members",
  templateUrl: "./club-members.component.html",
  styleUrls: ["./club-members.component.scss"]
})
export class ClubMembersComponent implements OnInit {
  members = [];
  id;
  posts: any[];
  constructor(private service: PostService, private router: Router) {}
  
  ngOnInit() {
    
    this.service.getDataAPI().subscribe(res => {
      console.log(res.json());
      let get = res.json()["hydra:member"]["0"];
      console.log(get);
      this.members = [get.personData];
      this.id = get["@id"];
    });
  }
  routingINFO() {
    this.router.navigate([`/club-members/${this.id}/info`]);
   
  }
  
}
