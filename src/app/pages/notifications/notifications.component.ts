import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  id;
  messages;
  countMess;
  constructor(
    private service: PostService,
  ) {
  }

  ngOnInit() {

    this.service.getMessage()
      .subscribe(res => {
        let messages = res.json()["hydra:member"]
        this.messages = messages;
        this.countMess = res.json()["hydra:member"].length;
        console.log("Message INFO", this.messages)
      })
    // getMessages
    setInterval(() => {
      this.service.getMessage()
        .subscribe(res => {
          let messages = res.json()["hydra:member"]
          this.messages = messages;
          this.countMess = res.json()["hydra:member"].length;
        })
    }, 5000);
  }

}
