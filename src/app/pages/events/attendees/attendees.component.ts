import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit {
  error = '';
  loading: boolean = true;
  page;
  data;
  constructor(
    private routes: ActivatedRoute,
    private apiService: PostService
  ) { }

  ngOnInit() {
    this.page = this.routes.snapshot.params.pages;
    this.checkRoute();
  }

  checkRoute(): boolean {
    if (this.page === 'member') {
      this.getAttendee(this.page);
      return true;
    } else if (this.page === 'non-member') {
      this.getAttendee(this.page)
      return true;
    } else {
      this.error = 'Page not available';
      return false;
    }
  }
  getAttendee(params) {
    this.apiService.eventGet(`/events/${this.routes.snapshot.params.id}/registrations?memberUuid%5Bexists%5D=${params === 'member' ? true : params === 'non-member' ? false : this.error === 'Page not available'}`)
      .subscribe(res => {
        this.data = res['hydra:member'];
        setTimeout(()=>{
          this.loading = false;
        }, 2000)
        if (params === 'member') {
          for (let d of this.data) {
            // this.apiService.getUserByuuid(d.memberUuid)
            //   .subscribe(res => {
            //     d['profilePicture'] = res['hydra:member'][0]['profilePicture'];
            //     this.apiService.getPersonByUuid(res['hydra:member'][0]['personData']['uuid'])
            //       .subscribe(res => {
            //         d['person'] = res['hydra:member'][0];
            //       })
            //   })
          }
        }
        console.log(this.data);
      })
  }

}
