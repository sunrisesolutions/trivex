import { Event } from "./../../../models/Event";
import { Registration } from "./../../../models/Registration";
import { Attendee } from "./../../../models/Attendee";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../../environments/environment";
import { AttendeeService } from "./../../../services/attendee.service";
import { AdminLayoutRoutes } from "./../../../layouts/admin-layout/admin-layout.routing";
import { Observable } from "rxjs";
import { PostService } from "./../../../services/post.service";
import { Http } from "@angular/http";
import { AuthService } from "./../../../services/auth.service";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  ElementRef
} from "@angular/core";
import { Router } from "@angular/router";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import * as jwt_decode from "jwt-decode";
import { getLocaleDateTimeFormat } from "@angular/common";
import { decode } from "@angular/router/src/url_tree";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { SettokenService } from "src/app/services/settoken.service";
import { error } from "@angular/compiler/src/util";
import { Routes, ActivatedRoute } from "@angular/router";

@Component({
  selector: "login-member",
  templateUrl: "./login-member.component.html",
  styleUrls: ["./login-member.component.scss"]
})
export class EventLoginMember implements OnInit, OnDestroy {
  // value formdata
  orgCode;
  phone;
  idNumber;
  id;
  toQr;
  //
  tokens;
  dob: NgbDate;
  posts: any[];
  invalidLogin: boolean;
  done = false;
  // event login

  //
  list;
  attendee: Attendee;
  // osda
  constructor(
    private router: Router,
    private service: PostService,
    private attendeesService: AttendeeService,
    private http: HttpClient,
    private serviceToken: SettokenService,
    private routes: ActivatedRoute,
    private atten: AttendeeService
  ) {}

  ngOnInit() {
    // this.service.getDataAPI().subscribe(res => {
    //   let get = res.json()["hydra:member"]["0"]["@id"];
    //   this.id = get;
    // });
  }

  ngOnDestroy() {}

  @ViewChild("dobi") dobi: ElementRef;
  asd;
  login() {
    let tokens;

    const inputDob = this.dobi.nativeElement.value;
    const formData = new FormData();
    formData.append("org-code", this.orgCode);
    formData.append("phone", this.phone);
    formData.append("id-number", this.idNumber);
    formData.append("birth-date", inputDob);
    const formRef = new FormData();

    // getinfo
    const snapID = +this.routes.snapshot.paramMap.get("id");
    this.service.getRootID(snapID).subscribe(res => {
      let obj = res.json().personData;
      let registration = {
        event: `events/${snapID}`,
        middleName: "sadsadsa",
        birthDate: "2019-05-06",
        givenName: `${obj.name}`,
        familyName: `${obj.employerName}`,
        gender: `${obj.jobTitle}`,
        email: "",
        phoneNumber: "sadsadsadsad",
        accessToken: "token"
      };
      let child: Attendee = {
        registration: registration
      };
      this.service.postFormData(formData).subscribe(response => {
        // settoken
        console.log(response.json());
        tokens = response.json().token;
        tokens.toString();
        // attendees
        this.atten.getAtten(child, tokens).subscribe(res => {
          (this.done = true), console.log(res);
        });
      });
    });
    // Login
  }
}
