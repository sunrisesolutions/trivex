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
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  test;
  id;

  deliveries: Array<Delivery> = [];
  currentPage = 1;
  scrollCallback;
  listMessageOptions = [];
  decoded: any;
  delivery2: Delivery;
  active;
  selectedOptionUuid: string;
  message: Message;

  constructor(
    public httpClient: HttpClient,
    private service: PostService, private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.decoded = jwt_decode(localStorage.getItem('token'));
    this.scrollCallback = this.getDelivery.bind(this);
    this.id = +this.route.snapshot.paramMap.get('id');
    this.selectedOptionUuid = this.route.snapshot.paramMap.get('selectedOptionUuid');
    this.service.getMessageById(this.id).subscribe(
      (res: Message) => {
        this.message = res;
      }
    );
  }

  ngOnInit() {

  }

  getDelivery() {
    console.log('getDelivery');
    let query = '';
    // let query = '&groupByMessage=true';
    // if (this.incomingOnly) {
    //   query += '&messageSenderUuid=' + this.decoded.im;
    // } else if (this.incomingOnly === false) {
    //   query += '&message.sender.uuid=' + this.decoded.im;
    // }

    const parents: Array<ResourceParent> = [];
    const parent = new ResourceParent();
    parent.id = this.id;
    parent.name = 'messages';
    parents.push(parent);

    query += '&selectedOptions=' + this.selectedOptionUuid;

    return this.service.getDelivery(query, this.currentPage, parents)
      .subscribe(res => {
        console.log('get deliveries successfully');
        this.currentPage++;
        this.deliveries = this.deliveries.concat(res['hydra:member']);
        // console.log(res)
        for (let delivery of this.deliveries) {
          console.log('requesting for delivery ', delivery);
          delivery.name = 'Loading...';
          delivery['profilePicture'] = '/assets/img-process/Loading-img.gif';
          if (delivery.recipientUuid !== undefined) {
            console.log('requesting for ' + delivery.recipientUuid);
            this.service.getMember(`?uuid=${delivery.recipientUuid}`)
              .subscribe(response => {
                // console.log('... requesting for ' + delivery.recipientUuid + '  ' + data[0]['personData'].name);
                // console.log('abc 123');
                let data = response['hydra:member'];
                if (data[0]) {
                  delivery['name'] = data[0]['personData'].name;
                  delivery['jobTitle'] = data[0]['personData'].jobTitle;
                  let profilePicture = data[0]['profilePicture'];

                  delivery['profilePicture'] = profilePicture;

                  if (delivery['profilePicture']) {
                    this.httpClient.get(delivery['profilePicture'])
                      .subscribe(res => {

                      }, err => {
                        if (err.status === 404) {
                          delivery['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                        }
                      });
                  } else {
                    delivery['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                  }
                }
              });
          }
          // if (delivery['message']['optionSet']) {
          //   this.service.optionSetsGet(`/${delivery['message'].optionSet['@id'].match(/\d+/g).map(Number)}/message_options`)
          //     .subscribe(res => {
          //       this.listMessageOptions = res['hydra:member'];
          //       delivery['arrayOptions'] = res['hydra:member'];
          //       for (let option of this.listMessageOptions) {
          //         option['selectedOptionMessage'] = false;
          //       }
          //     });
          //
          // }
        }
        console.log('message.component.ts deliveries', this.deliveries);
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
}
