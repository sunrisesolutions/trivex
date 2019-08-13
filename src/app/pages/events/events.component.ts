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
  event;
  getEventError = '';
  constructor(
    public apiService: PostService,
    public route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    let id = +this.route.snapshot.params.id;
    this.apiService.eventGet(`/events/${id}`)
      .subscribe(res => {
        this.loading = true;
        this.event = res;
        this.event['id'] = res['@id']
        console.log(res)
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
}
