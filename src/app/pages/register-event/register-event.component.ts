import {AuthLayoutRoutes} from './../../layouts/auth-layout/auth-layout.routing';
import {Routes, Router, ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Attendee} from '../../models/Attendee';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Registration} from '../../models/Registration';
import {AttendeeService} from '../../services/attendee.service';
import {PostService} from 'src/app/services/post.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss']
})
export class RegisterEventComponent implements OnInit {
  orgLogo = 'https://i.ya-webdesign.com/images/peach-svg-animated-6.gif';

  dob: NgbDate;
  model = {
    role: ''
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
    middleName: '',
    birthDate: '',
    givenName: '',
    familyName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    accessToken: 'token'
  };
  invalidLogin: boolean = false;
  attendee: Attendee;

  step = 1;
  done = false;
  pending = false;
  loading = false;
  error = '';
  events;

  constructor(
    private service: PostService,
    private attendeeService: AttendeeService,
    private router: Router,
    private routes: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.date.year = new Date().getFullYear();
    this.getEvents();
    let token = localStorage.getItem('token');
    if (token) {
      this.pending = true;
      this.checkin(token);
    }
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
        this.pending = false;
        console.log(res);
      },
      err => {
        this.error = err.error['hydra:description'];
        this.loading = false;
      }
    );
  }

  checkAge(dob) {
    this.loading = true;
    if (this.date.year - dob.year < 18) {
      this.notEnoughYearOld = 'You must be over 18 years old';
      this.loading = false;
    }
    if (this.date.year - dob.year >= 18 && this.step === 3) {
      this.login();
    }
    if (this.date.year - dob.year >= 18 && this.step === 2) {
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
        this.getLogoOrganisation();
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
      });
  }

  @ViewChild('dobi') dobi: ElementRef;

  checkin(token: string) {
    let decoded = jwt_decode(token);
    const snapID = +this.routes.snapshot.paramMap.get('id');
    this.service.getUserByuuidCustomToken(decoded.im, token)
      .subscribe(res => {
        let obj = res['hydra:member'][0];
        let registration = {
          event: `events/${snapID}`,
          birthDate: `${obj.personData.dob}`,
          middleName: null,
          givenName: `${obj.personData.givenName}`,
          familyName: `${obj.personData.familyName}`,
          gender: `${obj.personData.gender}`,
          email: `${obj.personData.email}`,
          phoneNumber: `${obj.personData.phone}`,
          accessToken: 'token',
          memberUuid: `${obj.uuid}`
        };
        const attendee: Attendee = {
          registration: registration
        };
        this.attendeeService.getAtten(attendee, token).subscribe(res => {
          this.pending = false; this.done = true;
          console.log(res);
        });
      });
  }

  login() {
    const inputDob = this.dobi.nativeElement.value;
    const formData = new FormData();
    formData.append('org-code', this.orgCode);
    formData.append('phone', this.phone);
    formData.append('id-number', this.idNumber);
    formData.append('birth-date', inputDob);
    const formRef = new FormData();

    // getinfo
    this.service.postFormData(formData)
      .subscribe(res => {
        this.checkin(res['token']);
      });
  }

  /* LOGIN BY SUBDOMAIN */
  getLogoOrganisation() {
    this.service.getLogoFilter(this.events.organisation.subdomain)
      .subscribe(res => {
        console.log('logo', res);
        this.orgLogo = res['logoReadUrl'];
      });
  }
}
