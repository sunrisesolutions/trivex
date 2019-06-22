import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private service: PostService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.id = +this.route.snapshot.paramMap.get("id");
      this.test = this.service.getMessageById(this.id)
        .subscribe(res => {
          console.log('MESSAGES-ID', res.json())
        })
    })
  }
  test;
  id;
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.test = this.service.getMessageById(this.id)
      .subscribe(res => {
        console.log('MESSAGES-ID', res.json())
      })
  }
}
