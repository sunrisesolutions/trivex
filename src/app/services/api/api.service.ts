import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const userAPI = "https://org.api.trivesg.com";

/* HEADER */
/* /.HEADER */

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "accept": "application/ld+json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    })
  };
  userInfo(id) {

    return this.http.get(`${userAPI}/individual_members/${id}`, this.httpOptions);
  }
}
