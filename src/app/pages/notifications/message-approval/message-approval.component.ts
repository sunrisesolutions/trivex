import {ActivatedRoute} from '@angular/router';
import {PostService} from 'src/app/services/post.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Delivery} from 'src/app/models/Deliveries';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as jwt_decode from 'jwt-decode';
import {ResourceParent} from '../../../models/ResourceParent';
import {Message} from '../../../models/Message';

@Component({
  selector: 'app-message-approvals',
  templateUrl: './message-approval.component.html',
  styleUrls: ['./message-approval.component.scss']
})
export class MessageApprovalComponent implements OnInit {
  test;
  id;

  deliveries: Array<Delivery> = [];
  currentPage = 1;
  scrollCallback: any = null;
  listMessageOptions = [];
  decoded: any;
  delivery2: Delivery;
  active;
  selectedOptionUuid: string;
  message: Message;
  optionName: string;
  initialised = false;
  delivery: Delivery;
  decision: string = null;
  reasonsForRejection: string = null;

  constructor(
    public httpClient: HttpClient,
    private service: PostService, private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.decoded = jwt_decode(localStorage.getItem('token'));
    // this.scrollCallback = this.getDelivery.bind(this);

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.decision = params['decision'];
      // this.selectedOptionUuid = params['selectedOptionUuid'];
      this.deliveries = [];
      this.currentPage = 1;

      this.initialise();
    });
  }
  pendingApprovalMessages: Array<Message>;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    // this.selectedOptionUuid = this.route.snapshot.paramMap.get('selectedOptionUuid');
    this.currentPage = 1;
    this.initialise();
  }

  initialise() {
    this.getPendingApprovalMessages();
  }
  getPendingApprovalMessages() {
    this.service.getMessage(1, '&status=MESSAGE_PENDING_APPROVAL&senderUuid='+this.decoded.im).subscribe(res => {
      this.pendingApprovalMessages = res['hydra:member'];
      for (const message of this.pendingApprovalMessages) {
        if (message.senderUuid !== undefined) {
          this.service.getSender(`?uuid=${message.senderUuid}`)
            .subscribe(response => {
              const data = response['hydra:member'];
              if (data[0]) {
                message['name'] = data[0]['personData'].name;
                message['senderId'] = data[0].id;
                const profilePicture = data[0]['profilePicture'];

                message['profilePicture'] = profilePicture;

                if (message['profilePicture']) {
                  this.httpClient.get(message['profilePicture'])
                    .subscribe(res => {

                    }, err => {
                      if (err.status === 404) {
                        message['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                      }
                    });
                } else {
                  message['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                }
              }
            });
        }
      }
    });
  }

  isActiveOption(item) {
    for (let i of item) {
      if (this.active === i.name) {
        i['selectedOptionMessage'] = !i['selectedOptionMessage'];
      } else {
        i['selectedOptionMessage'] = false;
      }
    }
  }

  selectOption(item) {
    this.active = item;
  }

  parseInt(number) {
    return Number.parseInt(number);
  }

  isResponded(delivery: Delivery) {
    return delivery.selectedOptions.length > 0;
  }
}
