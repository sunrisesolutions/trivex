import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.scss']
})
export class RegisterEventComponent implements OnInit {
  model = {
    role: ''
  }

  step = 1;
  done = false;

  constructor() { }

  ngOnInit() {
  }

  registerEvent() {
    this.done = true;
  }
}
