import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Delivery } from 'src/app/models/Deliveries';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jwt_decode from 'jwt-decode';
import { ResourceParent } from '../../../models/ResourceParent';
import { Message } from '../../../models/Message';
import {CheckRoleService} from '../../../services/check-role.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router,
    public roleChecker: CheckRoleService
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

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    // this.selectedOptionUuid = this.route.snapshot.paramMap.get('selectedOptionUuid');
    this.currentPage = 1;
    this.initialise();
  }
  role:any;
  initialise() {
    this.role = this.roleChecker;
    this.service.getMessageById(this.id).subscribe(
      (res: Message) => {
        this.message = res;

        this.message['name'] = 'Loading...';
        this.message['profilePicture'] = ' /assets/img-process/giphy-loading.gif';
        if (this.message.senderUuid !== undefined) {
          console.log('requesting for ' + this.message.senderUuid);
          this.service.getMember(`?uuid=${this.message.senderUuid}`)
            .subscribe(response => {
              // console.log('... requesting for ' + delivery.recipientUuid + '  ' + data[0]['personData'].name);
              // console.log('abc 123');
              let data = response['hydra:member'];
              if (data[0]) {
                this.message['senderId'] = data[0]['id'];
                this.message['name'] = data[0]['personData'].name;
                this.message['jobTitle'] = data[0]['personData'].jobTitle;
                let profilePicture = data[0]['profilePicture'];

                this.message['profilePicture'] = profilePicture;

                if (this.message['profilePicture']) {
                  this.httpClient.get(this.message['profilePicture'])
                    .subscribe(res => {

                    }, err => {
                      if (err.status === 404) {
                        this.message['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                      }
                    });
                } else {
                  this.message['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                }
              }
            });
        }
      }
    );
  }

  submitDecision(descision: string) {
    /* HEADER */
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    /* /.HEADER */
    const id = +this.route.snapshot.params.id;
    if (descision === 'approve') {
      const requestForm = {
        'approved': true,
      };
      this.httpClient.put(`https://messaging.api.whatwechat.net/messages/${id}`, requestForm, httpOptions)
        .subscribe(res => {
          localStorage.setItem("flashMessage", "The message from ... has been approved");
          this.router.navigate(['/club-members/notifications/announcement-approvals']);
        });
    }
    if (this.decision === 'reject') {
      const requestForm = {
        'rejected': true,
        'decisionReasons': this.reasonsForRejection
      };
      this.httpClient.put(`https://messaging.api.whatwechat.net/messages/${id}`, requestForm, httpOptions)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/club-members/notifications/announcement-approvals']);
        });
    }
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
