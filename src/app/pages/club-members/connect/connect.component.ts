import { Component, OnInit } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { PostService } from "src/app/services/post.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-connect",
  templateUrl: "./connect.component.html",
  styleUrls: ["./connect.component.scss"]
})
export class ConnectComponent implements OnInit {
  constructor(private service: PostService, private router: Router, private route: ActivatedRoute) {}
  id;
  status;
  members;
  tokenRes = false;
  cToken;
  ngOnInit() {
    this.cToken = localStorage.getItem("token");
    if (this.cToken == localStorage.getItem("token")) {
      this.tokenRes = true;
    }

    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getRootID(id).subscribe(res => {
      let getInfo = res.json();
      this.members = [getInfo];
      console.log("info user",res.json());
    });
    this.onConnect();
  }
  onConnect() {
    const id = new HttpParams();

    id.set("toMember", JSON.stringify(this.id));
    this.service.uConnect(id).subscribe(response => {
      console.log(response);
      if (response.status === 201) {
        this.status = "You have connected to this person.";
      }
    });
  }
  toClubMem(){
    this.router.navigate(['club-members']);
  }
}
