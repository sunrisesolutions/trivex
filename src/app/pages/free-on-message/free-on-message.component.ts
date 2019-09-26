import {Component, OnInit, TemplateRef} from '@angular/core';
import {PostService} from 'src/app/services/post.service';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {getLocaleDateTimeFormat} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';
import * as jwt_decode from 'jwt-decode';
import {CheckRoleService} from '../../services/check-role.service';

@Component({
  selector: 'app-free-on-message',
  templateUrl: './free-on-message.component.html',
  styleUrls: ['./free-on-message.component.scss']
})

export class FreeOnMessageComponent implements OnInit {
  isAdmin = false;
  error = '';
  effectiveFrom: any = {year: 2019, moth: 8, day: 20};
  expireAt: any = {year: 2019, moth: 9, day: 20};
  notEnoughOld: any;
  deviceInfo = null;
  availabilityMessage = [];
  success = false;
  time = {
    fromTime: null,
    toTime: null,
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

  loading = true;
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
  idMessage;
  onEdit: boolean = false;
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
  /*  template = {
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
   }; */
  form = {
    effectiveFrom: new Date(Date.now()).toISOString().split('T')[0],
    expireAt: null
  };

  constructor(
    public apiService: PostService,
    private deviceService: DeviceDetectorService,
    public roleChecker: CheckRoleService,
  ) {
  }

  decoded: string;

  ngOnInit() {
    this.decoded = jwt_decode(localStorage.getItem('token'));
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isAdmin = this.checkingRole();
    this.getMessage();
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  isIOS() {
    return this.deviceInfo.os === 'iOS';
  }

  getDownloadUrl() {
    return this.apiService.messageAPI + '/messages/' + this.decoded['org'] + '/download-org-free-on-messages-xlsx';
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
    if (!this.onEdit) {
      this.apiService.freeOnMessagePost(freeOnMessageBody)
        .subscribe(res => {
          this.loading = false;
          this.success = true;
          this.error = '';
          this.getMessage();
        }, error => {
          this.loading = false;
          this.error = error.error['hydra:description'];
        });
    } else {
      this.apiService.freeOnMessagePut(freeOnMessageBody, this.idMessage)
        .subscribe(res => {
          this.loading = false;
          this.success = true;
          this.error = '';
          this.getMessage();
        }, error => {
          this.loading = false;
          this.error = error.error['hydra:description'];
        });
    }
  }

  dragMethod(event) {
    console.log(event);
  }

  getMessage() {
    const isAdmin = this.isAdmin;
    let decoded = jwt_decode(localStorage.getItem('token'));
    this.apiService.getFreeOnMessage(decoded.im, isAdmin)
      .subscribe(res => {
        this.availabilityMessage = res['hydra:member'];
        console.log(res);
      });
  }

  deleteMessage(id) {
    if (window.confirm('Are you sure you want to delete this message ???')) {
      this.apiService.freeOnMessageDelete(id)
        .subscribe(res => {
          this.getMessage();
          alert('Successed.!!!');
        }, error => {
          alert(error.error['hydra:description']);
        });
    }
  }

  editMessage(data) {
    console.log(data);
    let pos = 0;
    this.onEdit = true;
    this.idMessage = data['@id'];
    this.day.monday = data.freeOnMondays;
    this.day.tuesday = data.freeOnTuesdays;
    this.day.wednesday = data.freeOnWednesdays;
    this.day.thursday = data.freeOnThursdays;
    this.day.friday = data.freeOnFridays;
    this.day.saturday = data.freeOnSaturdays;
    this.day.sunday = data.freeOnSundays;
    this.time.fromTime = `${(data.fromHour.toString().length === 1) ? '0' + data.fromHour : data.fromHour}:${(data.fromMinute.toString().length === 1) ? '0' + data.fromMinute : data.fromMinute}`;
    this.time.toTime = `${(data.toHour.toString().length === 1) ? '0' + data.toHour : data.toHour}:${(data.toMinute.toString().length === 1) ? '0' + data.toMinute : data.toMinute}`;
    this.form.effectiveFrom = `${data.effectiveFrom.split('T')[0]}`;
    this.form.expireAt = `${data.expireAt.split('T')[0]}`;
    window.scrollTo(0, pos - 20); // how far to scroll on each step
  }

  cancel() {
    this.onEdit = false;
    this.success = false;
    this.idMessage = '';
    this.day.monday = false;
    this.day.tuesday = false;
    this.day.wednesday = false;
    this.day.thursday = false;
    this.day.friday = false;
    this.day.saturday = false;
    this.day.sunday = false;
    this.time.fromTime = null;
    this.time.toTime = null;
    this.form.effectiveFrom = new Date(Date.now()).toISOString().split('T')[0];
    this.form.expireAt = null;
  }

  checkingRole() {
    let decoded = jwt_decode(localStorage.getItem('token'));
    this.apiService.G_OrgByUuid(decoded.org)
      .subscribe(res => {
        console.log(res);
        if (!res['hydra:member'][0].freeonMessagingEnabled) {
          this.error = 'You are not allowed to access this page. Please contact to admin.!!!';
          return false;
        }
      });
    if (this.roleChecker.ROLE_MSG_ADMIN) {
      return true;
    } else if (this.roleChecker.ROLE_ORG_ADMIN) {
      return false;
    } else {
      return false;
    }
  }
}
