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
  constructor(
    private service: PostService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }
  id;
  idSnap;
  status;
  members;
  tokenRes = false;
  cToken;
  imId;
  imToken;
  uuidRes;
  ngOnInit() {
    // ======= MESSAGE =====
    // this.cToken = localStorage.getItem("token");
    // if (this.cToken == localStorage.getItem("token")) {
    //   this.tokenRes = true;
    // }
    const snapID = this.routes.snapshot.paramMap.get("id");
    this.idSnap = snapID;
    this.imId = localStorage.getItem("im_id");

    const id = +this.routes.snapshot.paramMap.get("id");
    this.service.getRootID(id).subscribe(res => {
      console.log(res)
      let getInfo = res;
      this.members = [getInfo];
      console.log("info user", res);
    });
    this.onConnect();
  }
  onConnect() {
    // const idTit = new HttpParams();

    const id = +this.routes.snapshot.paramMap.get("id");
    // id.set("toMember", JSON.stringify(id));
    let data = {
      'toMember': `/individual_members/${id}`
    };
    this.service.uConnect(data).subscribe(response => {
      /* this.imToken = localStorage.getItem('im_id');
      this.uuidRes = response['toMember'].uuid;
      console.log("connect-member", response, this.imToken); */
    });
  }
  injectNumber(s) {
    return s.substring(s.lastIndexOf("/") + 1);
  }
  toClubMem() {
    this.router.navigate(["club-members"]);
  }
}
