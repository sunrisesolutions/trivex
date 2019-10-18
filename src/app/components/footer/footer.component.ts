import { Component, OnInit } from '@angular/core';
import {PwaService} from '../../services/pwa.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor(
    public pwa: PwaService,

  ) { }

  installPwa() {
    this.pwa.promptEvent.prompt();
    this.pwa.promptEvent.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the Wellness prompt');
        } else {
          console.log('User dismissed the Wellness prompt');
        }
        this.pwa.promptEvent = null;
      });
  }

  ngOnInit() {
  }

}
