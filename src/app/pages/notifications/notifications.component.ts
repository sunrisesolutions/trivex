import {Delivery} from './../../models/Deliveries';
import {Component, Input, OnInit} from '@angular/core';
import {PostService} from 'src/app/services/post.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/do';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() title: string;
  id;
  listMessageOptions = [];
  config = {
    displayKey: 'name',
    search: true,
    height: 'auto',
    placeholder: 'Select your option',
    // customComparator: ()=>{},
    // limitTo: options.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'name',
  };
  messages;
  showForm = false;
  members: Array<any> = [];
  active;
  deliveries: Array<Delivery> = [];
  delivery2: Delivery;
  messagesID = '';
  currentPage = 1;
  scrollCallback;
  countMess;
  queryDeliveriesREAD = '&readAt%5Bexists%5D=false';

  constructor(
    public httpClient: HttpClient,
    private service: PostService, private modalService: NgbModal
  ) {
    this.decoded = jwt_decode(localStorage.getItem('token'));
    this.scrollCallback = this.getDelivery.bind(this);
  }

  decoded: any;

  incomingOnly = null;

  toggleIncomingMessageFilter(type: string) {
    if (this.incomingOnly === null) {
      if (type === 'incoming') {
        this.incomingOnly = true;
      } else {
        this.incomingOnly = false;
      }
    } else {
      if (type === 'incoming') {
        this.incomingOnly = this.incomingOnly ? null : true;
      } else {
        this.incomingOnly = this.incomingOnly ? false : null;
      }
    }

    this.deliveries = [];
    this.currentPage = 1;
    this.getDelivery();
  }

  ngOnInit() {
  }

  getDelivery() {
    let query = '';
    if (this.incomingOnly) {
      query += 'messageSenderUuid=' + this.decoded.im;
    } else if (this.incomingOnly === false) {
      query += 'message.sender.uuid=' + this.decoded.im;
    }

    if (query.length > 0) {
      query = '&' + query;
    }

    return this.service.getDelivery(query, this.currentPage)
      .subscribe(res => {
        this.currentPage++;
        this.deliveries = this.deliveries.concat(res['hydra:member']);
        // console.log(res)
        for (let delivery of this.deliveries) {
          delivery.name = 'Loading...';
          delivery['profilePicture'] = '/assets/img-process/Loading-img.gif';
          if (delivery['message'].senderUuid !== undefined) {
            this.service.getSender(`?uuid=${delivery['message'].senderUuid}`)
              .subscribe(response => {
                let data = response['hydra:member'];
                if (data[0]) {
                  delivery['name'] = data[0]['personData'].name;
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
          if (delivery['message']['optionSet']) {
            this.service.optionSetsGet(`/${delivery['message'].optionSet['@id'].match(/\d+/g).map(Number)}/message_options`)
              .subscribe(res => {
                this.listMessageOptions = res['hydra:member'];
                delivery['arrayOptions'] = res['hydra:member'];
                for (let option of this.listMessageOptions) {
                  option['selectedOptionMessage'] = false;
                }
              });

          }
        }
        console.log('deliveries', this.deliveries);
      });

  }

  open(content, delivery) {
    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true});
      // this.delivery = delivery;
    }
    let d = new Date();
    let pramramsRead = {
      'read': true,
    };
    delivery.readAt = new Date();
    this.service.readDelivery(pramramsRead, delivery).subscribe(res => {
    });
  }

  putApproval(options, infoDelivery) {
    let ar = [];
    for (let option of options) {
      if (option['selectedOptionMessage']) {
        ar.push(option['uuid']);
      }
    }
    let idDelivery = infoDelivery['@id'];
    let bodyMessageOption = {
      'selectedOptions': ar
    };
    this.service.putDelivery(bodyMessageOption, `${idDelivery}`)
      .subscribe(res => {
        console.log(res);
        alert('Successfully.!!!');
      }, error => {
        if (error.status === 400) {
          alert(error.error['hydra:description']);
        }
        if (error.status === 404) {
          alert(error.error['hydra:description']);
        }
        if (error.status === 500) {
          alert(error.error['hydra:description']);
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
}
