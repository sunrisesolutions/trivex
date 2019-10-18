import {Component, OnInit} from '@angular/core';
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
  ) {
  }

  installPwa() {
    this.pwa.promptEvent.prompt();
    this.pwa.promptEvent.userChoice
      .then((choiceResult) => {
        let msg: string;
        if (choiceResult.outcome === 'accepted') {
          msg = 'User accepted the Wellness prompt';
          console.log(msg);
          localStorage.setItem('log', msg);
        } else {
          msg = 'User dismissed the Wellness prompt';
          localStorage.setItem('log', msg);
          console.log(msg);
        }
        this.pwa.promptEvent = null;
      });
  }

  ngOnInit() {
  }

}
