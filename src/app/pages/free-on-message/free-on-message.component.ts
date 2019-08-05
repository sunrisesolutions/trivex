import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-free-on-message',
  templateUrl: './free-on-message.component.html',
  styleUrls: ['./free-on-message.component.scss']
})

export class FreeOnMessageComponent implements OnInit {
  error = '';
  abcd;
  success = false;
  loading = false;
  required = false;
  fromDay = 0;
  toDay = 0;
  dirty;
  date = {
    year: 0,
    month: 0,
    day: 0
  }
  check = {
    fromDay: 0,
    toDay: 0,
    effectiveFrom: this.date,
    expireOn: this.date
  }
  labelDay = [
    {
      number: 1,
      value: 'Sunday',
    }, {
      number: 2,
      value: 'Monday',
    }, {
      number: 3,
      value: 'Tuesday',
    }, {
      number: 4,
      value: 'Wednesday',
    }, {
      number: 5,
      value: 'Thursday',
    }, {
      number: 6,
      value: 'Friday',
    }, {
      number: 7,
      value: 'Saturday'
    }
  ]
  template = {
    fromAt: '',
    toAt: '',
    fromDay: 0,
    toDay: 0,
    text: '',
    effectiveFrom: this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()+1
    },
    expireOn: this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+4,
      day: new Date().getDate()
    }
  }
  form = {
    fromAt: '',
    toAt: '',
    fromDay: 0,
    toDay: 0,
    text: '',
    effectiveFrom: this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()+1
    },
    expireOn: this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+4,
      day: new Date().getDate()
    }
  }

  constructor(
    public apiService: PostService
  ) { }

  ngOnInit() {

  }

  checkDay(formCheck) {
    if (formCheck.fromDay && formCheck.toDay) {
      this.form.fromDay = formCheck.fromDay;
      this.form.toDay = formCheck.toDay;
      if (this.form.fromDay == this.form.toDay) {
        this.check.fromDay = 0;
        this.check.toDay = 0;
        this.form.fromDay = this.check.fromDay;
        this.form.toDay = this.check.toDay;
        alert(`From day not same To day`);
        console.log(this.form.fromDay, this.form.toDay)
      }
      if (this.form.fromDay < this.form.toDay) {
        console.log('fromDay', this.form.fromDay, 'toDay', this.form.toDay);
        return true;
      }
      if (this.form.fromDay > this.form.toDay) {
        this.form.toDay = this.form.toDay + 7
        console.log('fromDay', this.form.fromDay, 'toDay', this.form.toDay);
        return true;
      }

    }
  }

  send(form) {
    this.loading = true;
    form.expireOn = `${form.expireOn.day}-${form.expireOn.month}-${form.expireOn.year}`
    form.effectiveFrom = `${form.effectiveFrom.day}-${form.effectiveFrom.month}-${form.effectiveFrom.year}`
    let freeOnMessageBody = {
      fromHour: Number(form.fromAt.slice(0, 2)),
      toHour: Number(form.toAt.slice(0, 2)),
      fromMinute: Number(form.fromAt.slice(3, 5)),
      toMinute: Number(form.toAt.slice(3, 5)),
      fromDay: Number(form.fromDay),
      toDay: Number(form.toDay),
      text: `${form.text}`,
      effectiveFrom: form.effectiveFrom,
      expireOn: form.expireOn

    }
     this.apiService.freeOnMessagePost(freeOnMessageBody)
       .subscribe(res => {
         this.loading = false;
         this.success = true;
         this.error = '';
         console.log(res);
       }, error => {
         this.loading = false;
         this.error = error.error['hydra:description'];
       })
  }
}
