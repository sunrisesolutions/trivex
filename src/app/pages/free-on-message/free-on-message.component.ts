import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

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
  dirty = false;
  template = {
    fromAt: '',
    toAt: '',
    fromDay: '',
    toDay: '',
    text: '',
    effectiveFrom: Date,
    expireOn: Date
  }
  form = {
    fromAt: '',
    toAt: '',
    fromDay: '',
    toDay: '',
    text: '',
    effectiveFrom: Date,
    expireOn: Date
  }

  constructor(
    public apiService: PostService
  ) { }

  ngOnInit() {

  }

  send(form) {
    this.loading = true;
    form.effectiveFrom = `${form.effectiveFrom.day}-${form.effectiveFrom.month}-${form.effectiveFrom.year}`
    form.expireOn = `${form.expireOn.day}-${form.expireOn.month}-${form.expireOn.year}`
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
    console.log(freeOnMessageBody)
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
