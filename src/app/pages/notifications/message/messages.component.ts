import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Delivery } from 'src/app/models/Deliveries';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  delivery = {
    "message":{},
    "name":'',
    "profilePicture":'',

  };
  constructor(private service: PostService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.id = +this.route.snapshot.paramMap.get("id");
      this.test = this.service.getMessageById(this.id)
        .subscribe(res => {
          console.log('MESSAGES-ID', res)
        })
    })
  }
  test;
  id;
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    this.service.getMessageById(this.id)
      .subscribe(res => {
        this.delivery.message = res['message'];
        var sender = res['message'].sender;
        var idSender = sender.match(/\d+/g).map(Number);
        this.service.getRootID(idSender)
          .subscribe(senderInfo=>{
            this.delivery.name = senderInfo['personData'].name;
            this.delivery.profilePicture = senderInfo['profilePicture'];
          })
        console.log('MESSAGES-ID', res)
      })
  }
}
