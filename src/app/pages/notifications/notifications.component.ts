import { Delivery } from './../../models/Deliveries';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/do';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  id;
  messages;
  showForm = false;
  members: Array<any> = [];
  deliveries: Array<Delivery> = [];
  delivery: Delivery;
  messagesID = '';
  currentPage = 1;
  scrollCallback;
  countMess;
  queryDeliveriesREAD = '?readAt%5Bexists%5D=false';
  constructor(
    private service: PostService, private modalService: NgbModal
  ) {
    this.scrollCallback = this.getDelivery.bind(this);
  }

  ngOnInit() {
  }


  getDelivery() {
    return this.service.getDelivery('',this.currentPage)
      .do(res => {
        this.currentPage++;
        this.deliveries = this.deliveries.concat(res['hydra:member']);
        for (let delivery of this.deliveries) {
          this.service.getSender(delivery['message'].sender)
            .subscribe(response => {
              let profilePicture = response['profilePicture'];
              let name = response['personData'].name;
              delivery.name = name;
              delivery.profilePicture = profilePicture;
            });
        }
        console.log('deliveries', this.deliveries)
      });

  }
  open(content, delivery) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' })
    this.delivery = delivery;
    let d = new Date();
    let pramramsRead = {
      "readAt": d.getTimezoneOffset(),
    }
    delivery.readAt = pramramsRead.readAt;
    this.service.readDelivery(pramramsRead, delivery['@id'])
      .subscribe(res=>{
      });
  }
}
