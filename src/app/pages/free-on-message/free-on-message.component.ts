import {Component, OnInit, TemplateRef} from '@angular/core';
import {PostService} from 'src/app/services/post.service';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {getLocaleDateTimeFormat} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-free-on-message',
  templateUrl: './free-on-message.component.html',
  styleUrls: ['./free-on-message.component.scss']
})

export class FreeOnMessageComponent implements OnInit {
  error = '';
  effectiveFrom: any = {year: 2019, moth: 8, day: 20};
  expireAt: any = {year: 2019, moth: 9, day: 20};
  notEnoughOld: any;
  deviceInfo = null;
  availabilityMessage = [];
  success = false;
  time = {
    fromTime: '',
    toTime: '',
  };
  day = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  };

  loading = false;
  required = false;

  selectedItems: boolean = true;
  optionDragModule = [
    {
      name: 'select on drag',
      status: true
    }, {
      name: 'select single mode',
      status: false
    }, {
      name: 'select with shortcut',
      status: false
    }
  ];
  documents = [
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
  ];
  toDay = 0;
  dirty;
  date = {
    year: 0,
    month: 0,
    day: 0
  };
  check = {
    fromDay: 0,
    toDay: 0,
    effectiveFrom: this.date,
    expireOn: this.date
  };
  template = {
    fromAt: '',
    toAt: '',
    fromDay: 0,
    toDay: 0,
    text: '',
    effectiveFrom: this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate() + 1
    },
    expireOn: this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 4,
      day: new Date().getDate()
    }
  };
  form = {
    effectiveFrom: null,
    expireAt: null
  };

  constructor(
    public apiService: PostService,
    private deviceService: DeviceDetectorService,
  ) {
  }

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.getAvailability();
  }

  isIOS() {
    return this.deviceInfo.os === 'iOS';
  }

  checkForm(time, day, dateStart) {
    // let expireAt = dateStart.expireAt.day + dateStart.expireAt.month + dateStart.expireAt.year;
    // let effectiveFrom = dateStart.effectiveFrom.day + dateStart.effectiveFrom.month + dateStart.effectiveFrom.year;

    let expireAt = dateStart.expireAt;
    let effectiveFrom = dateStart.effectiveFrom;

    // if (effectiveFrom > expireAt) {
    //   alert('Effective Time smaller than Expire Time');
    // } else if (!time.fromTime || !time.toTime) {
    //   alert('Please insert From and To time');
    // } else {
    this.send(time, day, dateStart);
    // }
  }

  send(time, day, dateStart) {
    this.loading = true;
    console.log('update 2 is here ', dateStart);
    // dateStart.expireAt = `${dateStart.expireAt.day}-${dateStart.expireAt.month}-${dateStart.expireAt.year}`;
    // dateStart.effectiveFrom = `${dateStart.effectiveFrom.day}-${dateStart.effectiveFrom.month}-${dateStart.effectiveFrom.year}`;
    let freeOnMessageBody = {
      published: true,
      fromHour: Number(time.fromTime.slice(0, 2)),
      toHour: Number(time.toTime.slice(0, 2)),
      fromMinute: Number(time.fromTime.slice(3, 5)),
      toMinute: Number(time.toTime.slice(3, 5)),
      'freeOnMondays': day.monday,
      'freeOnTuesdays': day.tuesday,
      'freeOnWednesdays': day.wednesday,
      'freeOnThursdays': day.thursday,
      'freeOnFridays': day.friday,
      'freeOnSaturdays': day.saturday,
      'freeOnSundays': day.sunday,
      effectiveFrom: dateStart.effectiveFrom,
      expireAt: dateStart.expireAt

    };
    this.apiService.freeOnMessagePost(freeOnMessageBody)
      .subscribe(res => {
        this.loading = false;
        this.success = true;
        this.error = '';
        console.log(res);
      }, error => {
        this.loading = false;
        this.error = error.error['hydra:description'];
      });
  }

  dragMethod(event) {
    console.log(event);
  }

  getAvailability(){
    let decoded = jwt_decode(localStorage.getItem('token'));
    this.apiService.getFreeOnMessage(decoded.im)
      .subscribe(res=>{
        this.availabilityMessage = res['hydra:member'];
      })
  }
}
