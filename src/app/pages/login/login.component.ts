import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  dob: NgbDate;

  constructor(private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    this.router.navigate(['/']);
    localStorage.setItem('token', 'token');
  }
}
