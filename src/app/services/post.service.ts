import {environment} from './../../environments/environment';
import {ClubMembersComponent} from './../pages/club-members/club-members.component';
import {Member} from './../models/Member';
import {LoginComponent} from './../pages/login/login.component';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Body} from '@angular/http/src/body';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Data} from '@angular/router';
import {Observable} from 'rxjs';
import {ResourceParent} from '../models/ResourceParent';
import {forEach} from '@angular/router/src/utils/collection';

/* header */

/* /.header */

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private loginAPI = 'https://user.api.trivesg.com/login/nric-phone-birthdate';
  private refreshAPI = 'https://user.api.trivesg.com/token/refresh';
  private orgAPI = 'https://org.api.trivesg.com';
  private orgConnectionsAPI = 'https://org.api.trivesg.com/connections';
  private messageAPI = 'https://messaging.api.trivesg.com';
  private userAPI = 'https://user.api.trivesg.com/login/individual-member-access-token';

  constructor(private http: HttpClient) {
  }

  apiBase = environment.eventApiBase;
  route = '/attendees';
  private urls = `${this.apiBase}${this.route}`;

  // POST REQUEST
  uConnect(idPost): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    return this.http.post(this.orgConnectionsAPI, idPost, httpOptions);
  }

  postFormData(post): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(this.loginAPI, post, httpOptions);
  }

  loginAccessToken(post): Observable<Object> {
    /* const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    }; */
    return this.http.post(`https://user.api.trivesg.com/login/individual-member-access-token`, post);
  }

  refreshToken(refresh): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(this.refreshAPI, refresh);
  }

  loginByAccessToken(access_token): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(this.userAPI, access_token, httpOptions);
  }

  // GET REQUEST
  getUserByuuidCustomToken(uuid, token): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${this.orgAPI}/individual_members?uuid=${uuid}`, httpOptions);
  }

  getUserByuuid(uuid): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.orgAPI}/individual_members?uuid=${uuid}`, httpOptions);
  }

  getRootID(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.orgAPI + '/individual_members/' + id, httpOptions);
  }

  getRootByFullID(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.orgAPI + id, httpOptions);
  }

  getDataAPI(page): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.orgAPI + `/individual_members${page}`, httpOptions);
  }

  getConnect(query): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.orgAPI}${query}`, httpOptions);
  }


  /* MESSAGES REQUEST*/
  messageOptionStatistical(query) {
    const httpOptions = {
      headers: new HttpHeaders({
        "accept": "application/ld+json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      })
    };

    return this.http.get(`${this.messageAPI}${query}`, httpOptions);
  }
  messagePost(message): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(this.messageAPI + '/messages', message, httpOptions);
  }

  getMessage(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.messageAPI + '/messages', httpOptions);
  }

  getSender(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.orgAPI}/individual_members${id}`, httpOptions);
  }

  getMember(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.orgAPI}/individual_members${id}`, httpOptions);
  }


  getDelivery(query, page: number = 1, parents: Array<ResourceParent> = []): Observable<Object> {
    if (query == '&selfDelivery=true') {
      console.log(' hey query is ', `/deliveries?page=${page}${query}`);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    let resourceParentPath = '';
    for (let index = 0; index < parents.length; index++) {
      resourceParentPath += '/' + parents[index].name + '/' + parents[index].id;
    }

    let observable = this.http.get(this.messageAPI + resourceParentPath + `/deliveries?page=${page}${query}`, httpOptions);
    if (query == '&selfDelivery=true') {
      console.log(observable);
    }
    return observable;
  }

  readDelivery(read, delivery): Observable<Object> {
    const id = delivery['@id'];
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.messageAPI}${id}`, read, httpOptions);
  }

  putDelivery(read, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.messageAPI}${id}`, read, httpOptions);
  }

  getMessageById(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.messageAPI + `/messages/${id}`, httpOptions);
  }

  /* /.MESSAGES */

  /*  OptionSets API */

  optionSetsGet(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.messageAPI}/option_sets${id}`, httpOptions);
  }

  optionSetsPost(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(`${this.messageAPI}/option_sets`, body, httpOptions);
  }

  optionSetsPut(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.messageAPI}/option_sets/${id}`, body, httpOptions);
  }

  optionSetsDelete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete(`${this.messageAPI}${id}`, httpOptions);
  }

  /* Message Option API */
  messageOptionsPost(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(`${this.messageAPI}/message_options`, body, httpOptions);
  }

  messageOptionsPut(body, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.messageAPI}/message_options/${id}`, body, httpOptions);
  }

  messageOptionsDelete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.delete(`${this.messageAPI}/message_options/${id}`, httpOptions);
  }

  messageOptionsGet(page) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.messageAPI}/message_option${page}`, httpOptions);
  }

  /* Organisation API */
  uploadImage(file, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.orgAPI}/individual_members/${id}`, file, httpOptions);
  }

  G_OrgByUuid(uuid) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.orgAPI}/organisations?uuid=${uuid}`, httpOptions);
  }

  subdomainFilter(subdomain) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`https://org.api.trivesg.com?subdomain=${subdomain}`, httpOptions);
  }

  getLogoFilter(subdomain) {
    return this.http.get(`https://org.api.trivesg.com/organisation/logourl/${subdomain}`);
  }

  /* /.Organisation API */

  /* EVENTS API */
  eventGet(route): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(`${this.apiBase}${route}`);
  }

  eventPost(body): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(`${this.apiBase}/events`, body, httpOptions);
  }

  eventPut(body, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(`${this.apiBase}${id}`, body, httpOptions);
  }

  eventDelete(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(`${this.apiBase}${id}`, httpOptions);

  }

  /* /.EVENTS API */

  /* Free on Message API */
  freeOnMessageGet(): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(`${this.messageAPI}/free_on_messages`, httpOptions);
  }

  freeOnMessagePost(body): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.post(`${this.messageAPI}/free_on_messages`, body, httpOptions);
  }

  freeOnMessagePut(body, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(`${this.messageAPI}/free_on_messages/${id}`, body, httpOptions);
  }

  freeOnMessageDelete(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(`${this.messageAPI}/free_on_messages/${id}`, httpOptions);
  }

  /* .,Free on Message API */
}
