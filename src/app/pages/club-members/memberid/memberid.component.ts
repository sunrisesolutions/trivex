import {Component, OnInit, Input, EventEmitter, OnDestroy} from '@angular/core';
import {PostService} from 'src/app/services/post.service';
import * as jwt_decode from 'jwt-decode';
import {getRootComponents} from '@angular/core/src/render3/discovery_utils';
import {HttpParams, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {OrganisationService} from '../../../services/organisation.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'info',
  templateUrl: './memberid.component.html',
  styleUrls: ['./memberid.component.scss']
})
export class MemberidComponent implements OnInit, OnDestroy {
  memberPhotoSub: Subscription;

  constructor(
    public service: PostService,
    private router: Router,
    private routes: ActivatedRoute,
    public http: HttpClient,
    public orgService: OrganisationService
  ) {
    this.routes.params.subscribe(val => {
      this.getRootId();
      this.memberPhotoSub = this.orgService.getMemberPhoto()
        .subscribe(mymessage => this.memberPhoto = mymessage);
    });
  }

  ngOnDestroy() {
    this.memberPhotoSub.unsubscribe();
  }

  memberPhoto;
  notFoundMember;
  file;
  loading: boolean = true;
  id: number;
  formEdit = {
    name: '',
    groupName: '',
    employerName: '',
    givenName: '',
    familyName: '',
    phone: '',
    email: '',
    job: '',
    jobIndustry: '',
    interestGroups: '',
    alternateEmployerName: '',
    homeAddress: '',
    lifeStyle: '',
    mobileNumber: '',

  };
  imId: number;
  imUuid;
  snapID;
  members: Object = {
    personData: {
      name: ''
    }
  };
  tokenRes = false;
  cToken;
  member;

  ngOnInit() {
    this.orgService.updateMemberPhoto('/assets/img-process/giphy-loading.gif');
    this.getRootId();
    this.cToken = localStorage.getItem('token');
    if (this.cToken == localStorage.getItem('token')) {
      this.tokenRes = true;
    }
    const decoded = jwt_decode(this.cToken);
    this.imUuid = decoded.im;
    //   members.profilePicture
  }

  getRootId() {
    this.snapID = this.routes.snapshot.params.id;
    this.id = this.snapID;
    // localStorage.getItem("im_id").match(/\d+/g).map(Number).toString();

    this.members['profilePicture'] = '/assets/img-process/giphy-loading.gif';
    this.service.getRootID(this.snapID).subscribe(res => {
      this.members = res;
      // this.members['id'] = this.members['@id'].match(/\d+/g).map(Number);
      if (res['uuid'] === this.imUuid) {
        this.imId = parseInt(this.members['id'], 10);
      }

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
            this.memberPhoto = this.members['profilePicture'];
            console.log('image', res);
          }, error => {
            if (error.status === 404) {
              this.memberPhoto = '/assets/img-process/Not-found-img.gif';
            } else {
              this.memberPhoto = this.members['profilePicture'];
            }
          });
      } else {
        this.memberPhoto = '/assets/img-process/Not-found-img.gif';
      }
    }, error => {
      if (error.status === 404) {
        this.loading = false;
        this.notFoundMember = 'Member Not Found.!!!';
      }
    });
  }

  uploadProfilePicture(event: Event, urlUpload) {
    const snapID = this.routes.snapshot.params.id;
    if (snapID == localStorage.getItem('im_id')) {
      const file = (<HTMLInputElement>document.getElementById('fileUpload')).files[0];
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
        this.memberPhoto = '/assets/img-process/loading.gif';
        this.orgService.updateMemberPhoto(this.memberPhoto);
        this.http.post(attributes['action'], formLogoWrite)
          .subscribe(res => {
            let form = {
              'profilePicture': attributes['action'] + urlUpload['filePath']
            };
            this.service.getRootID(this.snapID).subscribe(res => {
              this.memberPhoto = res['profilePicture'];
              this.orgService.updateMemberPhoto(this.memberPhoto);
            });
            this.service.uploadImage(form, snapID)
              .subscribe(res => {
                console.log(res);

              });
          });
      }
    }
  }

  editInfo(data, element, id) {
    console.log('in memberid.comp');
    if (this.routes.snapshot.params.id == this.imId) {
      const formEdit = {
        'familyName': (data.familyName) ? data.familyName : undefined,
        'givenName': (data.givenName) ? data.givenName : undefined,
        'email': (data.email) ? data.email : undefined,
        'phoneNumber': (data.phone) ? data.phone : undefined,
        'jobTitle': (data.job) ? data.job : undefined,
        'jobIndustry': (data.jobIndustry) ? data.jobIndustry : undefined,
        'employerName': (data.employerName) ? data.employerName : undefined,
        'interestGroups': (data.interestGroups) ? data.interestGroups : undefined,
        'alternateEmployerName': (data.alternateEmployerName) ? data.alternateEmployerName : undefined,
        'homeAddress': (data.homeAddress) ? data.homeAddress : undefined,
        'lifeStyle': (data.lifeStyle) ? data.lifeStyle : undefined,
        'mobileNumber': (data.mobileNumber) ? data.mobileNumber : undefined,

      };
      if (data.groupName != null && data.groupName !== undefined && data.groupName != '') {
        this.service.editGroupName(data.groupName, this.imId)
          .subscribe(res => {
            // element.hidden = !element.hidden;
            this.formEdit.groupName = '';
          }, err => {
            if (err.status === 404) {
              alert(err.error['hydra:description']);
            }
            if (err.status === 400) {
              alert(err.error['hydra:description']);
            }
            if (err.status === 500) {
              alert(err.error['hydra:description']);
            }
          });
      }
      this.service.editInfoPerson(`/people/${id.split('/')[2]}`, formEdit)
        .subscribe(res => {
          element.hidden = !element.hidden;
          this.getRootId();
          this.clean();
        }, err => {
          if (err.status === 404) {
            alert(err.error['hydra:description']);
          }
          if (err.status === 400) {
            alert(err.error['hydra:description']);
          }
          if (err.status === 500) {
            alert(err.error['hydra:description']);
          }
        });
    }
  }

  toClubMem() {
    this.router.navigate(['club-members']);
  }

  injectNumber(s) {
    return s.substring(s.lastIndexOf('/') + 1);
  }

  goHome() {
    return this.router.navigate(['/dashboard']);
  }

  clean() {
    this.formEdit = {
      name: '',
      groupName: '',
      employerName: '',
      givenName: '',
      familyName: '',
      phone: '',
      email: '',
      job: '',
      jobIndustry: '',
      interestGroups: '',
      alternateEmployerName: '',
      homeAddress: '',
      lifeStyle: '',
      mobileNumber: '',

    };
  }
}
