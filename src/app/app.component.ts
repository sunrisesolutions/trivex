import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './services/post-notif.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';

const VAPID_SERVER_KEY = "BKNj-ROJiHb7ccxeZ4NjaGnyCa4EtLRXz2N0zNcWQZVm6fTJYTKdBqLJkmQD8tTITzPRP59TEdj7SxRVprkrYVA"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  location: Location;

  constructor(

  ) {

  }

  ngOnInit() {
    if (environment.production) {
      if (location.protocol === 'http:') {
        if (window.location.href = 'http:') {
          window.location.href = location.href.replace('http', 'https');
        }
      }
    }
  }


}
