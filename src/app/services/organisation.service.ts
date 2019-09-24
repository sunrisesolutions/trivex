import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  apiBase = environment.orgApiBase;
  memberPhoto = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  getMemberPhoto(): Observable<string> {
    return this.memberPhoto.asObservable();
  }

  updateMemberPhoto(photo: string) {
    this.memberPhoto.next(photo);
  }

  connectToMember(id, subject, body) {
    let url = `${this.apiBase}/individual_members/${id}/email`;
    let data = {
      emailSubject: subject,
      emailBody: body
    }
    return this.http.put(url, data, {headers: AuthService.getHeaders()});
  }
}
