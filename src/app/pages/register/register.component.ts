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
  @ViewChild('dobi') dobi: ElementRef;

  registration: Registration = {
    middleName: '',
    birthDate: '',
    givenName: '',
    familyName: '',
    gender: '',
    email: '',
    phoneNumber: ''
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.registration.birthDate = this.dobi.nativeElement.value;
    this.authService.postRegistration(this.registration).subscribe(res => {
      console.log(res);
      this.loading = false;
      this.done = true;
    });
  }
}
