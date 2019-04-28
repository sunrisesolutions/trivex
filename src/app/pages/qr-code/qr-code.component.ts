import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  qrCodeLink = 'https://qrcode.magentapulse.com/qr-code/https://www.google.com.png';

  constructor() { }

  ngOnInit() {
  }

}
