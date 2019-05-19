import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './services/post-notif.service';

const VAPID_SERVER_KEY = "BKNj-ROJiHb7ccxeZ4NjaGnyCa4EtLRXz2N0zNcWQZVm6fTJYTKdBqLJkmQD8tTITzPRP59TEdj7SxRVprkrYVA"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private swPush: SwPush,
    private pushNotif: PushNotificationService,
    // private newsletterService: NewsletterService
  ) {
    
  }
}
