import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://user.api.trivesg.com/login/nric-phone-birthdate';
  private refUrl = 'https://user.api.trivesg.com/token/refresh';
  private getUrl = 'https://org.api.trivesg.com/individual_members';
  constructor(
    private http: HttpClient,
  ) { }

  getPosts() {
   
    let header = new HttpHeaders();
    header.append('Accept', 'application/ld+json');
    header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.getUrl, {headers: header})
  }

  postFormData(post) {
    return this.http.post(this.url, post)
  }
  refreshToken(refresh) {
    return this.http.post(this.refUrl, refresh)
  }

}
