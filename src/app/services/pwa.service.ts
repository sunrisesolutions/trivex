import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent;
  unreadMessageCount = 0;

  constructor() {
    window.addEventListener('beforeinstallprompt', event => {
      localStorage.setItem('log', 'beforeinstallprompt event added');
      event.preventDefault();
      localStorage.setItem('log', 'beforeinstallprompt event added and default prevented');
    });
  }
}
