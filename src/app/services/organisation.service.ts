import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  apiBase = environment.orgApiBase;
  route = '/connections';
  url = `${this.apiBase}${this.route}`;

  constructor(
    private http: HttpClient
  ) { }

  connectToMember(memberId) {
    let connection = {
      toMember: memberId
    }
    return this.http.post(this.url, connection, {headers: AuthService.getHeaders()});
  }
}
