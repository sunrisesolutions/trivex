import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent;
  unreadMessageCount = 0;

  constructor() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
    });
  }
}
