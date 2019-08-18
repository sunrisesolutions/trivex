import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';
import { Delivery } from 'src/app/models/Deliveries';
import { PostService } from 'src/app/services/post.service';

interface SearchResult {
  deliveries: Delivery[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(deliveries: Delivery[], column: string, direction: string): Delivery[] {
  if (direction === '') {
    return deliveries;
  } else {
    return [...deliveries].sort((a, b) => {
      let res = 0;
      if (column == 'body') {
        res = compare(a.message.body, b.message.body);
      } else {
        res = compare(a[column], b[column]);
      }
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(delivery: Delivery, term: string, pipe: PipeTransform) {
  const body = delivery.message.body || '';
  return body.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class SmartTableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _deliveries$ = new BehaviorSubject<Delivery[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private list: Delivery[];
  
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };
  
  constructor(private pipe: DecimalPipe, private service: PostService) {
    this.service.getDelivery('', 1).subscribe((res) => {
      this.list = res['hydra:member'];
    });
    
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._deliveries$.next(result.deliveries);
        this._total$.next(result.total);
      });
      
      this._search$.next();
    }
    
    get deliveries$() { return this._deliveries$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    
    set page(page: number) { this._set({page}); }
    set pageSize(pageSize: number) { this._set({pageSize}); }
    set searchTerm(searchTerm: string) { this._set({searchTerm}); }
    set sortColumn(sortColumn: string) { this._set({sortColumn}); }
    set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }
    
    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }
    
    private _search(): Observable<SearchResult> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      
      // 1. sort
      let deliveries = sort(this.list, sortColumn, sortDirection);
      
      // 2. filter
      deliveries = deliveries.filter(delivery => matches(delivery, searchTerm, this.pipe));
      const total = deliveries.length;
      
      // 3. paginate
      deliveries = deliveries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({deliveries, total});
    }
  }