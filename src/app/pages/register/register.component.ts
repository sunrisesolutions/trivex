import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  dob: NgbDate;
  done: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  register() {
    this.done = true;
  }
}
