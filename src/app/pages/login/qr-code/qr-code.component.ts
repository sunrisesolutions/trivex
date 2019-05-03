import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  id;
  qrLink;
  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getDataAPI().subscribe(res => {
      let get = res.json()["hydra:member"]["0"];
      this.id = get["@id"];
      let link = `https://qrcode.magentapulse.com/qr-code/https://www.trivesg.com/club-members${this.id}/connect.png`
      this.qrLink = link;
      console.log(res.json())
    });
  }

}
