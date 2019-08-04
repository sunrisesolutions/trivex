import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { PostService } from "../../services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";
import { OrganisationService } from "../../services/organisation.service";
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-post-announcement',
  templateUrl: './post-announcement.component.html',
  styleUrls: ['./post-announcement.component.scss']
})
export class PostAnnouncementComponent implements OnInit {
  idOptionSet;
  dropdownOptions = [
    'option-1',
    'option-2',
    'option-3',
    'option-4',
    'option-5'
  ]
  config = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    placeholder: 'Select your option',
    // customComparator: ()=>{},
    // limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
  }
  test;
  member;
  loading = false;
  subject;
  listOptions: Array<any>[] = [];
  selected = 'Select your option';
  listSelect = [
    { name: 'option-1' },
    { name: 'option-2' },
  ]
  body;
  error = '';
  success = false;
  closeResult;
  @ViewChild("modal") modal: ElementRef;
  constructor(
    private service: PostService,
    private orgService: OrganisationService,
    private router: Router,
    private routes: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.getOptionSets();
  }

  getOptionSets() {
    this.service.optionSetsGet('')
      .subscribe(res => {
        this.listOptions = res['hydra:member'];
        console.log(this.listOptions);
      });
  }

  send(idOptionSet) {
    // REQUEST POST
    let _message = {
      "published": true,
      "subject": this.subject,
      "body": this.body,
      "optionSet": (idOptionSet) ? idOptionSet : null
    }
    this.service.messagePost(_message)
      .subscribe(res => {
        this.success = true;
        console.log(res)
      }, error => {
        if (error.status === 400) {
          this.error = error.error['hydra:description']
          // alert(error.error['hydra:description']);
        }
        if (error.status === 404) {
          this.error = error.error['hydra:description']
          // alert(error.error['hydra:description']);
        }
        if (error.status === 500) {
          this.error = error.error['hydra:description']
          // alert(error.error['hydra:description']);
        }
        this.success = false;
      })
    // Timeout
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getId(event) {
    console.log(event);
    if (event.value) {
      this.idOptionSet = event.value['@id'];
    } else {
      this.idOptionSet = null;
    }
  }
}
