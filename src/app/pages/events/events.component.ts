import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  loading = false;
  event;
  constructor(
    public apiService: PostService,
    public route: ActivatedRoute
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
      })
  }

  idEvent(s) {
    if (s) {
      return s.match(/\d+/g).map(Number);
    }
  }
}
