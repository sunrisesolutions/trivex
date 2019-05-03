import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  apiBase = environment.orgApiBase;

  constructor(
    private http: HttpClient
  ) { }

  connectToMember(id, subject, body) {
    let url = `${this.apiBase}/individual_members/${id}/email`;
    let data = {
      emailSubject: subject,
      emailBody: body
    }
    return this.http.put(url, data, {headers: AuthService.getHeaders()});
  }
}
