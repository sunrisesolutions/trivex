import { AuthLayoutRoutes } from './../../layouts/auth-layout/auth-layout.routing';
import { Routes, Router, ActivatedRoute } from "@angular/router";
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
    event: `/events/${this.routes.snapshot.params.id}`,
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
  events;
  id;
  constructor(
    private service: PostService,
    private attendeeService: AttendeeService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEvents();
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
      registration: this.registration,
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

  getEvents() {
    let id = +this.routes.snapshot.params.id;
    this.service.eventGet(`/events/${id}`)
      .subscribe(res => {
        this.loading = true;
        this.events = res;
        this.events['id'] = res['@id']
      }, error => {
        if (error.status === 404) {
          this.error = 'Event not found.!!!';
        }
        if (error.status === 401) {
          this.error = error.error.message;
        }
        if (error.status === 400) {
          this.error = error.error.message;
        }
        if (error.status === 500) {
          this.error = error.error.message;
        }
        // this.router.navigate(['/club-members']);
      })
  }
  toLogin() {
    let id = +this.routes.snapshot.paramMap.get('id');
    this.router.navigate([`events/${id}/login`])
  }
}
