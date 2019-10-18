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
  }

  ngOnInit() {
  }

}
