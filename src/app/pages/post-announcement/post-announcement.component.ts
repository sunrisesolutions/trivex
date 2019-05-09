import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { PostService } from "../../services/post.service";
import * as jwt_decode from "jwt-decode";
import { getRootComponents } from "@angular/core/src/render3/discovery_utils";
import { HttpParams } from "@angular/common/http";
import { OrganisationService } from "../../services/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-post-announcement',
  templateUrl: './post-announcement.component.html',
  styleUrls: ['./post-announcement.component.scss']
})
export class PostAnnouncementComponent {
  constructor(
    private service: PostService,
    private orgService: OrganisationService,
    private router: Router,
    private routes: ActivatedRoute,
    private modalService: NgbModal
  ) {}
  member;
  loading = false;
  subject = '';
  body = '';
  error = '';
  success = false;
  closeResult;
  @ViewChild("modal") modal: ElementRef;
  
  send() {
    this.success = true;
    setTimeout(() => {
      this.open(this.modal);
    }, 5000);
  }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
}
