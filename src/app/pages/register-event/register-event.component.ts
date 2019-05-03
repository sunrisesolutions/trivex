import { Routes, Router } from "@angular/router";
import { Http } from "@angular/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Attendee } from "../../models/Attendee";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Registration } from "../../models/Registration";
import { AttendeeService } from "../../services/attendee.service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-register-event",
  templateUrl: "./register-event.component.html",
  styleUrls: ["./register-event.component.scss"]
})
export class RegisterEventComponent implements OnInit {
  dob: NgbDate;

  model = {
    role: ""
  };
  registration: Registration = {
    event: null,
    middleName: "",
    birthDate: "",
    givenName: "",
    familyName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    accessToken: "token"
  };
  attendee: Attendee;

  step = 1;
  done = false;
  loading = false;
  error = "";
  id;
  constructor(
    private service: PostService,
    private attendeeService: AttendeeService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  registerEvent() {
    this.loading = true;
    if (this.dob) {
      this.registration.birthDate = new Date(
        this.dob.year,
        this.dob.month,
        this.dob.day
      ).toISOString();
    }
    this.attendee = {
      registration: this.registration
    };
    this.attendeeService.postAttendee(this.attendee).subscribe(
      res => {
        this.loading = false;
        this.done = true;
        console.log(res);
      },
      err => {
        this.error = err.error["hydra:description"];
        this.loading = false;
      }
    );
  }
  toLogin(){
    this.router.navigate['/login'];
  }
}
