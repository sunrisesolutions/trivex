import { Component, OnInit } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
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
    private routes: ActivatedRoute,
    public http: HttpClient
  ) { }
  id;
  idSnap;
  status;
  members: Object = {
    personData: {
      name: ''
    }
  };
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
    const snapID = this.routes.snapshot.paramMap.get('id');
    this.idSnap = snapID;
    this.imId = localStorage.getItem('im_id');
    if (this.routes.snapshot.paramMap.get('id') === localStorage.getItem('im_id')) {
      return this.router.navigate(['/dashboard']);
    } else {
      this.onConnect();
    }
    this.id = +this.routes.snapshot.paramMap.get('id');
    /*  this.service.getRootID(id).subscribe(res => {
       console.log(res)
       let getInfo = res;
       this.members = getInfo;
       this.members['id'] = this.members['@id'].match(/\d+/g).map(Number);
       console.log("info user", res);
       if (this.members.profilePicture) {
         this.http.get(this.members.profilePicture)
           .subscribe(res => { }, error => {
             if (error.status === 404) {
               this.members['profilePicture'] = '/assets/img-process/Not-found-img.gif'
             }
           })
       } else {
         this.members['profilePicture'] = '/assets/img-process/Not-found-img.gif'
 
       }
     }); */
    this.getRootId();
  }
  loading: boolean = true;
  snapID;
  error;
  getRootId() {
    this.snapID = this.routes.snapshot.params.id;
    this.id = this.snapID;
    // localStorage.getItem("im_id").match(/\d+/g).map(Number).toString();

    this.members['profilePicture'] = '/assets/img-process/giphy-loading.gif';
    this.service.getRootID(this.snapID).subscribe(res => {
      this.members = res;
      // this.members['id'] = this.members['@id'].match(/\d+/g).map(Number);
      /*    if (res['uuid'] === this.imUuid) {
           this.imId = parseInt(this.members['id'],10);
         } */

      this.service.getPersonByUuid(this.members['personData'].uuid)
        .subscribe(res => {
          this.members['alternateName'] = res['hydra:member'][0].alternateName;
          this.members['person'] = res['hydra:member'][0];
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      console.log(this.members);
      if (this.members['profilePicture']) {
        this.http.get(this.members['profilePicture'])
          .subscribe(res => {
            console.log('image', res);
          }, error => {
            if (error.status === 404) {
              this.members['profilePicture'] = '/assets/img-process/Not-found-img.gif';
            }
          });
      } else {
        this.members['profilePicture'] = '/assets/img-process/Not-found-img.gif';
      }
    }, error => {
      if (error.status === 404) {
        this.loading = false;
        this.error = 'Member Not Found.!!!';
      }
    });
  }
  onConnect() {
    // const idTit = new HttpParams();

    const id = +this.routes.snapshot.paramMap.get("id");
    // id.set("toMember", JSON.stringify(id));
    let data = {
      'toMember': `/individual_members/${id}`
    };
    this.service.uConnect(data).subscribe(response => {
      this.imToken = localStorage.getItem('im_id');
      this.uuidRes = response['toMember'].uuid;
      console.log("connect-member", response, this.imToken);
    });
  }
  goHome() {
    return this.router.navigate(['/dashboard']);
  }
  injectNumber(s) {
    if (s) {
      return s.match(/\d+/g).map(Number);
    }
  }
  toClubMem() {
    this.router.navigate(["/club-members"]);
  }
}
