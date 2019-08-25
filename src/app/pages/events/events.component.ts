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
  id;
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
  editEvent: Boolean = false;
  getEventError = '';
  constructor(
    public apiService: PostService,
    public route: ActivatedRoute,
    private router: Router

  ) {
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
    if (this.createEvent) {
      this.apiService.eventPost(formEvent)
        .subscribe(res => {
          setTimeout(() => {
            this.finished();
          }, 1000)
        })
    }
    if (this.editEvent) {
      this.apiService.eventPut(formEvent, this.id)
        .subscribe(res => {
          setTimeout(() => {
           
            this.finished();
          }, 1000)
        })
    }
  }
  deleteEvent(id) {
    this.apiService.eventDelete(id)
      .subscribe(res => {
        this.getEvents();
      })
  }
  updateEvent(form, id) {
    this.editEvent = true;
    this.id = id;
    this.formSubmit.name = form.name;
    this.formSubmit.date.startOn = form.startedAt.split('T')[0];
    this.formSubmit.date.endOn = form.endedAt.split('T')[0];
    this.formSubmit.title = form.title;
    this.formSubmit.subTitle = form.subTitle;
    console.log(form)
  }
  finished() {
    this.loading = false;
    this.getEvents();
    this.createEvent = false;
    this.editEvent = false;
    this.date = {
      startOn: new Date(Date.now()).toISOString().split('T')[0],
      endOn: new Date(Date.now()).toISOString().split('T')[0]
    }
    this.formSubmit = {
      name: '',
      title: '',
      subTitle: '',
      date: this.date
    }
  }
  clean(){
    this.date = {
      startOn: new Date(Date.now()).toISOString().split('T')[0],
      endOn: new Date(Date.now()).toISOString().split('T')[0]
    }
    this.formSubmit = {
      name: '',
      title: '',
      subTitle: '',
      date: this.date
    }
  }
}
