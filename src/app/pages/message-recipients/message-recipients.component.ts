import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Delivery } from 'src/app/models/Deliveries';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { SmartTableService } from './smart-table.service';

@Component({
  selector: 'app-message-recipients',
  templateUrl: './message-recipients.component.html',
  styleUrls: ['./message-recipients.component.scss'],
  providers: [DecimalPipe]
})
export class MessageRecipientsComponent {

  deliveries$: Observable<Delivery[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private service: SmartTableService) {
    this.deliveries$ = service.deliveries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    console.log('sorting');

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}