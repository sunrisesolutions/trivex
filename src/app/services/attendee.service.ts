import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Attendee } from "../models/Attendee";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AttendeeService {
  apiBase = environment.eventApiBase;
  route = "/attendees";
  url = `${this.apiBase}${this.route}`;

  constructor(private http: HttpClient) {}
  postAttendee(attendee: Attendee): Observable<any> {
    return this.http.post(this.url, attendee);
  }

  public static getHeaders(token) {
    return new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Accept': "application/ld+json"
    });
  }

  getAtten(atten: Attendee, setToken): Observable<any> {
    return this.http.post(this.url, atten, {headers: AttendeeService.getHeaders(setToken)});
  }
}
