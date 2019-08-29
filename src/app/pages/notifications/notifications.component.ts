import { Delivery } from './../../models/Deliveries';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/do';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { ResourceParent } from '../../models/ResourceParent';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../models/Message';
import { CheckRoleService } from 'src/app/services/check-role.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() title: string;
  @Input() statusIpt: string = null;

  id;
  listMessageOptions = [];
  loading: boolean = true;
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
  showForm = false;
  members: Array<any> = [];
  active;
  deliveries: Array<Delivery> = [];
  delivery2: Delivery;
  showRespond: boolean = false;
  messagesID = '';
  currentPage = 1;
  scrollCallback;
  error;
  optionsVoted = [];
  countMess;
  queryDeliveriesREAD = '&readAt%5Bexists%5D=false';


  status: string = null;

  constructor(
    private roleChecker: CheckRoleService,
    public httpClient: HttpClient,
    private service: PostService, private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.decoded = jwt_decode(localStorage.getItem('token'));
    this.scrollCallback = this.getDelivery.bind(this);
  }

  initialise() {
    if (this.statusIpt !== null) {
      this.status = this.statusIpt;
    }
    if (this.status === 'outgoing') {
      this.incomingOnly = false;
    }
  }

  decoded: any;

  incomingOnly = true;

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
    this.status = this.route.snapshot.paramMap.get('status');
    this.route.params.subscribe(params => {
      this.status = params['status'];
      // this.selectedOptionUuid = params['selectedOptionUuid'];
      this.deliveries = [];
      this.currentPage = 1;

      this.initialise();
    });
    this.checkingRole();
  }

  getDelivery() {
    let query = '&groupByMessage=true';
    if (this.incomingOnly) {
      query += '&messageSenderUuid=' + this.decoded.im;
    } else if (this.incomingOnly === false) {
      query += '&message.sender.uuid=' + this.decoded.im;
    }

    return this.service.getDelivery(query, this.currentPage)
      .do(res => {
        this.currentPage++;
        this.deliveries = this.deliveries.concat(res['hydra:member']);
        setTimeout(() => {
          this.loading = false;
        }, 2000);
        // console.log(res)
        for (let delivery of this.deliveries) {
          delivery.name = 'Loading...';
          delivery['profilePicture'] = ' /assets/img-process/giphy-loading.gif';
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
                let options = this.listMessageOptions = res['hydra:member'];
                delivery['arrayOptions'] = res['hydra:member'];
                for (let option of options) {
                  option['selectedOptionMessage'] = false;
                }

                if (!this.incomingOnly) {
                  this.statisticalOptions(options, delivery);
                }
              });

          }
        }
        console.log('deliveries', this.deliveries);
      });

  }

  open(content, delivery) {
    if (delivery.arrayOptions) {
      this.statisticalOptions(delivery.arrayOptions, delivery);
    }
    ;

    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true });
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

          this.countNewResponses(o, infoDelivery.messageId, o.uuid);

        }
        console.log(options);
      });
  }

  countNewResponses(o, messageId = null, selectedOption = null) {
    let decoded = jwt_decode(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    let url = `https://messaging.api.trivesg.com/deliveries?optionsSelectedAt[exists]=true&selectedOptionsReadAt[exists]=false&message.sender.uuid=${decoded.im}`;
    if (messageId !== null && selectedOption !== null) {
      url = `https://messaging.api.trivesg.com/messages/${messageId}/deliveries?optionsSelectedAt[exists]=true&selectedOptionsReadAt[exists]=false&message.sender.uuid=${decoded.im}&selectedOptions=${selectedOption}`;
    }
    this.httpClient.get(url, httpOptions)
      .subscribe(res => {
        console.log(res);
        o['newResponseCount'] = res['hydra:member'].length;
      });
  }

  isResponded(delivery: Delivery) {
    return delivery.selectedOptions.length > 0;
  }

  parseInt(number) {
    return Number.parseInt(number);
  }
  checkingRole() {
    if (this.roleChecker.ROLE_ORG_ADMIN || this.roleChecker.ROLE_MSG_ADMIN) {
      this.service.G_OrgByUuid(this.decoded.org)
        .subscribe(res => {
          if (!res['hydra:member'][0].adminAnnouncementEnabled ) {
            return this.error = 'You are not allowed to access this page. Please contact to admin.!!!';
          }
        })
    } else {
      return this.error = 'You are not allowed to access this page. Please contact to admin.!!!';
    }
  }
}
