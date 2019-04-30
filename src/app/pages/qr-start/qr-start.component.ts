import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-qr-start',
  templateUrl: './qr-start.component.html',
  styleUrls: ['./qr-start.component.scss']
})
export class QrStartComponent implements OnInit {
  model = {
    name: '',
    contactNumber: '',
    phoneCode: 65,
    email: '',
    confirmEmail: '',
    expertise: {
      it: false,
      hr: false
    },
    jobs: {
      job1: false,
      job2: false
    },
    spoken: null,
    spokenTo: {
      bonjour: false,
      binhLe: false
    },
    note: ''
  }

  step = 1;
  totalStep = 6;
  validating = false;
  loading = false;
  finish = false;
  editPhoneCode = false;

  @ViewChild('step1Form') step1Form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  back() {
    this.validating = false;
    if (this.step == 6) {
      this.step = 4;
    } else {
      this.step--;
    }
  }

  next() {
    this.validating = true;
    if (this.step == 1 && !this.step1Form.valid) return;
    else if (this.step == 2 && !this.model.expertise.it && !this.model.expertise.hr) return;
    else if (this.step == 3 && !this.model.jobs.job1 && !this.model.jobs.job2) return;
    else if (this.step == 4 && !this.model.spoken) this.step++;
    else if (this.step == 5 && !this.model.spokenTo.bonjour && !this.model.spokenTo.binhLe) return;
    this.validating = false;
    this.step++;
  }

  submit() {
    this.loading = true;
    console.log(this.model);
    setTimeout(() => {
      this.loading = false;
      this.finish = true;
    }, 2000);
  }

  finishEditPhoneCode() {
    this.editPhoneCode = false;
    if (!this.model.phoneCode) {
      this.model.phoneCode = 65;
    }
  }
}
