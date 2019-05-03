import { Router } from "@angular/router";
import { PostService } from "./../../services/post.service";
import { Component, OnInit, HostBinding } from "@angular/core";
import { Member } from "src/app/models/Member";
import { HttpParams } from "@angular/common/http";
export const MEMBERS: Member[] = [
  {
    firstName: "Handsome",
    lastName: "Bean",
    company: "Mr. Bean solution Co., Ltd",
    role: "Sales Manager",
    email: "binh@sunrise.vn",
    phone: "+84 369140916",
    status: "connect"
  } as Member,
  {
    firstName: "Peter Bean",
    lastName: "the handsome",
    company: "Magenta Consulting Services Pte., Ltd",
    role: "Technical Lead",
    email: "peter@magenta-wellness.com",
    phone: "+84 834567247",
    status: "pending"
  } as Member,
  {
    firstName: "George Washington",
    lastName: "- not so handsome yet legendary",
    company: "The White House - United States of America",
    role: "First President",
    email: "george-washington@whitehouse.gov",
    phone: "+84 369140916",
    status: "re-connect"
  } as Member,
  {
    firstName: "Handsome",
    lastName: "Bean",
    company: "Mr. Bean solution Co., Ltd",
    role: "Sales Manager",
    email: "binh@sunrise.vn",
    phone: "+84 369140916",
    status: "connect"
  } as Member
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

  onConnect(){
    this.router.navigate([`/club-members/${this.id}/connect`])
  }
  
}
