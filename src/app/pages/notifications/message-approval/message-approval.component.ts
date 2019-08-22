import {Delivery} from './../../../models/Deliveries';
import {Component, Input, OnInit} from '@angular/core';
import {PostService} from 'src/app/services/post.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/do';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from '../../../models/Message';

@Component({
  selector: 'app-message-approvals',
  templateUrl: './message-approval.component.html',
  styleUrls: ['./message-approval.component.scss']
})
export class MessageApprovalComponent implements OnInit {
  test;
  id;
  @Input() title: string;

  deliveries: Array<Delivery> = [];
  currentPage = 1;
  scrollCallback: any = null;
  listMessageOptions = [];
  decoded: any;
  delivery2: Delivery;
  active;
  selectedOptionUuid: string;
  messages: Array<Message>;
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
    this.scrollCallback = this.getMessage.bind(this);

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

  getMessage() {
    return this.service.getMessage(1, '&type=simple&senderMessageAdmin=false&approvalDecidedAt[exists]=true').subscribe(res => {
      this.messages = res['hydra:member'];
      for (const message of this.messages) {
        message['profilePicture'] = '/assets/img-process/Loading-img.gif';
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

  getPendingApprovalMessages() {
    this.service.getMessage(1, '&type=simple&senderMessageAdmin=false&approvalDecidedAt[exists]=false').subscribe(res => {
      this.pendingApprovalMessages = res['hydra:member'];
      for (const message of this.pendingApprovalMessages) {
        message['profilePicture'] = '/assets/img-process/Loading-img.gif';
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
