import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Registration } from '../../models/Registration';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  dob: NgbDate;
  done = false;
  loading = false;
  error = '';

  registration: Registration = {
    middleName: '',
    birthDate: '',
    givenName: '',
    familyName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    accessToken: 'token'
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    if (this.dob) {
      this.registration.birthDate = new Date(this.dob.year, this.dob.month, this.dob.day).toISOString();
    }
    this.authService.postRegistration(this.registration).subscribe(
      res => {
      console.log(res);
      this.loading = false;
      this.done = true;
    }, err => {
      this.error = err.error['hydra:description'];
      this.loading = false;
    });
  }
}
