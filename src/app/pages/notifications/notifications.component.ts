import { Delivery } from './../../models/Deliveries';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs-compat/add/operator/do';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  id;
  listMessageOptions = [
    { name: 'message-option-1' },
    { name: 'message-option-2' },
    { name: 'message-option-3' },
    { name: 'message-option-4' },
  ];
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
  }
  messages;
  showForm = false;
  members: Array<any> = [];
  deliveries: Array<Delivery> = [];
  delivery2: Delivery;
  messagesID = '';
  currentPage = 1;
  scrollCallback;
  countMess;
  queryDeliveriesREAD = '?readAt%5Bexists%5D=false';
  constructor(
    public httpClient: HttpClient,
    private service: PostService, private modalService: NgbModal
  ) {
    this.scrollCallback = this.getDelivery.bind(this);
  }

  ngOnInit() {
  }


  getDelivery() {
    return this.service.getDelivery('', this.currentPage)
      .do(res => {
        this.currentPage++;
        this.deliveries = this.deliveries.concat(res['hydra:member']);
        // console.log(res)
        for (let delivery of this.deliveries) {
          delivery.name = 'Waiting...';
          delivery['profilePicture'] = 'https://media2.giphy.com/media/FREwu876NMmBy/giphy.gif'
          if (delivery['message'].senderUuid !== undefined) {
            this.service.getSender(`?uuid=${delivery['message'].senderUuid}`)
              .subscribe(response => {
                let data = response['hydra:member'];
                if (data[0]) {
                  delivery['name'] = data[0]['personData'].name;
                  let profilePicture = data[0]['profilePicture'];

                  delivery['profilePicture'] = profilePicture;

                  this.httpClient.get(delivery['profilePicture'])
                    .subscribe(res => {

                    }, err => {
                      if (err.status === 404) {
                        delivery.profilePicture = 'https://i.gifer.com/B0eS.gif';
                      }
                    })
                }
              });
          }
          if (delivery['message']['optionSet']) {
            this.service.optionSetsGet(`/${delivery['message'].optionSet['@id'].match(/\d+/g).map(Number)}/message_options`)
              .subscribe(res => {
                this.listMessageOptions = res['hydra:member']
                delivery['arrayOptions'] = res['hydra:member'];
                for (let option of this.listMessageOptions) {
                  option['selectedOptionMessage'] = false;
                }
              })

          }
        }
        console.log('deliveries', this.deliveries)
      });

  }
  open(content, delivery) {
    delivery['idSender'] = delivery['message'].senderId;
    if (content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true })
      // this.delivery = delivery;
    }
    let d = new Date();
    let pramramsRead = {
      "readAt": d.getTimezoneOffset(),
    }
    delivery.readAt = pramramsRead.readAt;
    this.service.readDelivery(pramramsRead, delivery['@id']).subscribe(res => {
    });
  }

  putApproval(options, infoDelivery) {
    let ar = [];
    for (let option of options) {
      if (option['selectedOptionMessage']) {
        ar.push(option['uuid'])
      }
    }
    let idDelivery = infoDelivery['@id'];
    let bodyMessageOption = {
      "selectedOptions": ar
    }
    this.service.putDelivery(bodyMessageOption, `${idDelivery}`)
      .subscribe(res => {
        console.log(res)
        alert('Successfully.!!!')
      }, error => {
        if (error.status === 400) {
          alert(error.error['hydra:description'])
        }
        if (error.status === 404) {
          alert(error.error['hydra:description'])
        }
        if (error.status === 500) {
          alert(error.error['hydra:description'])
        }
      })
  }
}
