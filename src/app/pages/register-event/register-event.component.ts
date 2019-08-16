import { AuthLayoutRoutes } from './../../layouts/auth-layout/auth-layout.routing';
import { Routes, Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Attendee } from "../../models/Attendee";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Registration } from "../../models/Registration";
import { AttendeeService } from "../../services/attendee.service";
import { PostService } from "src/app/services/post.service";
import * as jwt_decode from 'jwt-decode';
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
  notEnoughYearOld = '';
  orgCode;
  date = {
    year: 0,
    month: 0,
    day: 0
  };
  phone;
  idNumber;
  id;
  toQr;
  //
  tokens;
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
  invalidLogin: boolean = false;
  attendee: Attendee;

  step = 1;
  done = false;
  loading = false;
  error = "";
  events;
  constructor(
    private service: PostService,
    private attendeeService: AttendeeService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit() {
    this.date.year = new Date().getFullYear();
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

  checkAge(dob) {
    this.loading=true;
    if (this.date.year - dob.year < 18) {
      this.notEnoughYearOld = 'You must be over 18 years old';
      this.loading=false;
    } if (this.date.year - dob.year >= 18 && this.step === 3) {
      this.login();
    } if (this.date.year - dob.year >= 18 && this.step === 2){
      this.registerEvent();
    }
  }

  getEvents() {
    this.loading = true;
    let id = +this.routes.snapshot.params.id;
    this.service.eventGet(`/events/${id}`)
      .subscribe(res => {
        this.loading = false;
        this.events = res;
        this.events['id'] = res['@id'];
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
    this.service.postFormData(formData)
      .subscribe(res => {
        let decoded = jwt_decode(res['token']);
        tokens = res['token'];
        this.service.getUserByuuid(decoded.im)
          .subscribe(res => {
            let obj = res['hydra:member'][0];
            let registration = {
              event: `events/${snapID}`,
              birthDate: `${obj.personData.dob}`,
              middleName: null,
              givenName: `${obj.personData.name}`,
              familyName: `${obj.personData.employerName}`,
              gender: `${obj.personData.jobTitle}`,
              email: `${obj.personData.email}`,
              phoneNumber: `${obj.personData.phone}`,
              accessToken: "token",
              memberUuid: `${obj.uuid}`
            };
            let child: Attendee = {
              registration: registration
            };
            this.attendeeService.getAtten(child, tokens).subscribe(res => {
              (this.done = true), console.log(res);
            });
          })
      })
    /*   this.service.getRootID(localStorage.getItem('im_')).subscribe(res => {
        let obj = res['personData'];
        let registration = {
          event: `events/${snapID}`,
          middleName: "sadsadsa",
          birthDate: `${obj['birth-date']}`,
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
          console.log(response);
          tokens = response['token'];
          tokens.toString();
          // attendees
          this.attendeeService.getAtten(child, tokens).subscribe(res => {
            (this.done = true), console.log(res);
          });
        });
      }); */
    // Login
  }
}
