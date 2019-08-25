import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  loading = false;
  events = [];
  event;
  date = {
    startOn: new Date(Date.now()).toISOString().split('T')[0],
    endOn: new Date(Date.now()).toISOString().split('T')[0]
  }
  formSubmit = {
    name: '',
    title: '',
    subTitle: '',
    date: this.date
  }
  createEvent: Boolean = false;
  getEventError = '';
  constructor(
    public apiService: PostService,
    public route: ActivatedRoute,
    private router: Router

  ) {
    console.log(this.date)
  }

  ngOnInit() {
    this.getEvents();
    if (this.route.snapshot.params.id) {
      this.getEvent();
    }
  }

  getEvents() {
    this.loading = true;
    let id = +this.route.snapshot.params.id;
    this.apiService.eventGet(`/events`)
      .subscribe(res => {
        this.loading = false;
        this.events = res['hydra:member'];
        for (let e of this.events) {
          e['id'] = e['@id'];
          e['qrLink'] = `https://qrcode.magentapulse.com/qr-code/https://trivesg.com/events/${this.getNumberOfString(e.id)}/registration.png`;
        }

      }, error => {
        if (error.status === 404) {
          this.getEventError = 'Event not found.!!!';
        }
        if (error.status === 401) {
          this.getEventError = error.error.message;
        }
        if (error.status === 400) {
          this.getEventError = error.error.message;
        }
        if (error.status === 500) {
          this.getEventError = error.error.message;
        }
        // this.router.navigate(['/club-members']);
      })
  }

  idEvent() {
    let id = +this.route.snapshot.params.id;
    return id;
  }
  getNumberOfString(string) {
    if (string) {
      return string.split('/')[2];
    }
  }
  getEvent() {
    this.loading = true;
    const id = +this.route.snapshot.params.id;
    this.apiService.eventGet(`/events/${id}`)
      .subscribe(res => {
        this.loading = false;
        this.event = res;
        this.event['id'] = this.event['@id'];
        this.event['qrLink'] = `https://qrcode.magentapulse.com/qr-code/https://trivesg.com/events/${this.getNumberOfString(this.event['id'])}/registration.png`;
      }, error => {
        if (error.status === 404) {
          this.getEventError = 'Event not found.!!!';
        }
        if (error.status === 401) {
          this.getEventError = error.error.message;
        }
        if (error.status === 400) {
          this.getEventError = error.error.message;
        }
        if (error.status === 500) {
          this.getEventError = error.error.message;
        }
        // this.router.navigate(['/club-members']);
      });
  }
  toEvent(id) {
    this.router.navigate([`dashboard/events/${this.getNumberOfString(id)}`])
  }
  submitEvent(form) {
    this.loading = true;
    let formEvent = {
      name: form.name,
      title: form.title,
      subtitle: form.subTitle,
      startedAt: form.date.startOn,
      endedAt: form.date.endOn,
      timezone: 'Asia/Singapore'
    }
    this.apiService.eventPost(formEvent)
      .subscribe(res => {
        setTimeout(() => {
          this.loading = false;
          this.getEvents();
          this.createEvent = false;
        }, 1000)
      })
  }
}
