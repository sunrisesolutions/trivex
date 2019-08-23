import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "info",
  templateUrl: "./memberid.component.html",
  styleUrls: ["./memberid.component.scss"]
})
export class MemberidComponent implements OnInit {
  constructor(
    public service: PostService,
    private router: Router,
    private routes: ActivatedRoute,
    public http: HttpClient
  ) {
    this.routes.params.subscribe(val => {
      this.getRootId();
    })
  }
  notFoundMember;
  file;
  id;
  formEdit = {
    name: '',
    employerName: '',
    phone: '',
    email: '',
    job: ''
  }
  imId;
  snapID
  members: Object = {
    personData: {
      name: ''
    }
  }
  tokenRes = false;
  cToken;
  member;
  ngOnInit() {
    this.getRootId();

    this.cToken = localStorage.getItem("token");
    if (this.cToken == localStorage.getItem("token")) {
      this.tokenRes = true;
    }


  }
  getRootId() {
    this.snapID = this.routes.snapshot.params.id;
    this.id = this.snapID;
    this.imId = localStorage.getItem("im_id").match(/\d+/g).map(Number).toString();
    this.members['profilePicture'] = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif';
    this.service.getRootID(this.snapID).subscribe(res => {
      this.members = res;

      this.members['id'] = this.members['@id'].match(/\d+/g).map(Number);
      this.service.getPersonByUuid(this.members['personData'].uuid)
        .subscribe(res => {
          this.members['alternateName'] = res['hydra:member'][0].alternateName;
        })
      console.log(this.members);
      if (this.members['profilePicture']) {
        this.http.get(this.members['profilePicture'])
          .subscribe(res => {
          }, error => {
            if (error.status === 404) {
              this.members['profilePicture'] = '/assets/img-process/Not-found-img.gif';
            }
          })
      } else {
        this.members['profilePicture'] = '/assets/img-process/Not-found-img.gif';
      }
    }, error => {
      if (error.status === 404) {
        this.notFoundMember = 'Member Not Found.!!!';
      }
    });
  }

  uploadProfilePicture(event: Event, urlUpload) {
    const snapID = this.routes.snapshot.params.id;
    if (snapID == localStorage.getItem('im_id')) {
      const file = (<HTMLInputElement>document.getElementById("fileUpload")).files[0];
      // return console.log(file);
      let attributes = urlUpload['attributes'];
      let inputs = urlUpload['inputs'];
      let formLogoWrite = new FormData;
      formLogoWrite.append('Policy', inputs['Policy']);
      formLogoWrite.append('X-Amz-Algorithm', inputs['X-Amz-Algorithm']);
      formLogoWrite.append('X-Amz-Credential', inputs['X-Amz-Credential']);
      formLogoWrite.append('X-Amz-Date', inputs['X-Amz-Date']);
      formLogoWrite.append('X-Amz-Signature', inputs['X-Amz-Signature']);
      formLogoWrite.append('acl', inputs['acl']);
      formLogoWrite.append('key', urlUpload['filePath']);
      formLogoWrite.append('file', file);
      if (file) {
        this.http.post(attributes['action'], formLogoWrite)
          .subscribe(res => {
            let form = {
              "profilePicture": attributes['action'] + urlUpload['filePath']
            }
            this.service.uploadImage(form, snapID)
              .subscribe(res => {
                console.log(res);
              })
          })
      }
    }
  }

  editInfo(data, element, realData) {

    let id = this.routes.snapshot.params.id;
    if (id === localStorage.getItem('im_id')) {
      const formEdit = {
        "givenName": (data.name) ? data.name : null,
        "email": (data.email) ? data.email : null,
        "phoneNumber": (data.phone) ? data.phone : null,
        "jobTitle": (data.job) ? data.job : null,
        "employerName": (data.employerName) ? data.employerName : null
      }
      this.service.editInfoPerson(`/people/${id}`, formEdit)
        .subscribe(res => {
          element.hidden = !element.hidden;
        }, err => {
          if (err.status === 404) {
            alert(err.error['hydra:description'])
          }
          if (err.status === 400) {
            alert(err.error['hydra:description'])
          }
          if (err.status === 500) {
            alert(err.error['hydra:description'])
          }
        })
    }
  }

  toClubMem() {
    this.router.navigate(["club-members"]);
  }
  injectNumber(s) {
    return s.substring(s.lastIndexOf("/") + 1);
  }

  goHome() {
    return this.router.navigate(['/club-members']);
  }
}
