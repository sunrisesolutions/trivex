import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Attendee } from '../models/Attendee';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {
  apiBase = environment.apiBase;
  route = '/attendees';
  url = `${this.apiBase}${this.route}`;

  constructor(
    private http: HttpClient
  ) { }

  postAttendee(attendee: Attendee): Observable<any> {
    return this.http.post(this.url, attendee, {headers: AuthService.getHeaders()});
  }
}
