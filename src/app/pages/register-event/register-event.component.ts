import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attendee } from '../../models/Attendee';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Registration } from '../../models/Registration';
import { AttendeeService } from '../../services/attendee.service';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss']
})
export class RegisterEventComponent implements OnInit {
  dob: NgbDate;
  @ViewChild('dobi') dobi: ElementRef;
  
  model = {
    role: ''
  }
  registration: Registration = {
    event: null,
    middleName: '',
    birthDate: '',
    givenName: '',
    familyName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    accessToken: ''
  }
  attendee: Attendee;

  step = 1;
  done = false;
  loading = false;

  constructor(
    private attendeeService: AttendeeService
  ) { }

  ngOnInit() {
  }

  registerEvent() {
    this.loading = true;
    this.registration.birthDate = this.dobi.nativeElement.value;
    this.attendee = {
      registration: this.registration
    }
    this.attendeeService.postAttendee(this.attendee).subscribe(res => {
      this.loading = false;
      this.done = true;
      console.log(res);
    })
  }
}
