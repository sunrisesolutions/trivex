import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  id;
  qrLink;

  constructor(private service: PostService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    let decoded = jwt_decode(localStorage.getItem('token'));
    this.service.G_OrgByUuid(decoded.org)
      .subscribe(res=>{
        for(let org of res['hydra:member']){
          this.qrLink = `https://qrcode.magentapulse.com/qr-code/https://${org.subdomain}.trivesg.com/club-members/${id}/connect.png`;
        }
        console.log(res)
      })
    const id = +this.route.snapshot.paramMap.get('id');
  }
}
