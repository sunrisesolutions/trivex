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

  constructor(
    public httpClient: HttpClient,
    private service: PostService, private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.decoded = jwt_decode(localStorage.getItem('token'));
    // this.scrollCallback = this.getDelivery.bind(this);

    this.route.params.subscribe(params => {
      this.id = +params['id'];
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

  initialise() {
    this.service.getDeliveryById(this.id).subscribe(
      (res: Delivery) => {
        this.delivery = res;
        let pramramsRead = {
          'read': true,
        };
        this.delivery.readAt = new Date();
        this.service.readDelivery(pramramsRead, this.delivery).subscribe(readDeliveryRes => {
        });

        this.delivery.name = 'Loading...';
        this.delivery['profilePicture'] = '/assets/img-process/Loading-img.gif';
        if (this.delivery.message.senderUuid !== undefined) {
          console.log('requesting for ' + this.delivery.message.senderUuid);
          this.service.getMember(`?uuid=${this.delivery.message.senderUuid}`)
            .subscribe(response => {
              // console.log('... requesting for ' + delivery.recipientUuid + '  ' + data[0]['personData'].name);
              // console.log('abc 123');
              let data = response['hydra:member'];
              if (data[0]) {
                this.delivery['name'] = data[0]['personData'].name;
                this.delivery['jobTitle'] = data[0]['personData'].jobTitle;
                let profilePicture = data[0]['profilePicture'];

                this.delivery['profilePicture'] = profilePicture;

                if (this.delivery['profilePicture']) {
                  this.httpClient.get(this.delivery['profilePicture'])
                    .subscribe(res => {

                    }, err => {
                      if (err.status === 404) {
                        this.delivery['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                      }
                    });
                } else {
                  this.delivery['profilePicture'] = '/assets/img-process/Not-found-img.gif';
                }
              }
            });
        }

        if (this.delivery['message']['optionSet']) {
          this.service.optionSetsGet(`/${this.delivery['message'].optionSet['@id'].match(/\d+/g).map(Number)}/message_options`)
            .subscribe(res => {
              this.listMessageOptions = res['hydra:member'];
              this.delivery['arrayOptions'] = res['hydra:member'];
              for (let option of this.listMessageOptions) {
                option['selectedOptionMessage'] = false;
              }

              if (this.delivery.arrayOptions) {
                this.statisticalOptions(this.delivery.arrayOptions, this.delivery);
              }
            });

        }
      }
    );
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

  statisticalOptions(options, infoDelivery: Delivery = null) {
    let query = '';
    const parents: Array<ResourceParent> = [];
    const parent = new ResourceParent();
    parent.id = infoDelivery.messageId;
    parent.name = 'messages';
    parents.push(parent);

    query += '&selectedOptions=MSG-';

    this.service.getDelivery(query, this.currentPage, parents)
      .subscribe(res => {
        for (let o of options) {
          let query = '';
          const parents: Array<ResourceParent> = [];
          const parent = new ResourceParent();
          parent.id = infoDelivery.messageId;
          parent.name = 'messages';
          parents.push(parent);

          query += '&selectedOptions=' + o.uuid;
          this.service.getDelivery(query, this.currentPage, parents)
            .subscribe(optionRes => {
              o['voted'] = optionRes['hydra:totalItems'];
              o['totalVotes'] = res['hydra:totalItems'];
            });
        }
        console.log(options);
      });
  }
logme(_var){
    console.log('logggg',_var);
}
  parseInt(number) {
    return Number.parseInt(number);
  }

  isResponded(delivery: Delivery) {
    return delivery.selectedOptions.length > 0;
  }

  putApproval(options, infoDelivery) {
    let ar = [];
    let selectedOption = null;
    for (let option of options) {
      if (option['selectedOptionMessage']) {
        selectedOption = option;
        ar.push(option['uuid']);
      }
    }
    let idDelivery = infoDelivery['@id'];
    let bodyMessageOption = {
      'selectedOptions': ar
    };
    this.service.putDelivery(bodyMessageOption, `${idDelivery}`)
      .subscribe(res => {
        this.statisticalOptions(options, infoDelivery);
        infoDelivery.selectedOptions.push(selectedOption);
        /* console.log(res);
        alert('Successfully.!!!'); */
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

}
