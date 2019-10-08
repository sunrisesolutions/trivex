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
import * as jwt_decode from 'jwt-decode';

/* header */
export interface TEST {
  profilePicture: 'assets/img-process/giphy-loading.gif';
}

/* /.header */

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private loginAPI = 'https://user.api.whatwechat.net/login/phone-birthdate';
  private refreshAPI = 'https://user.api.whatwechat.net/token/refresh';
  private orgAPI = 'https://org.api.whatwechat.net';
  private orgConnectionsAPI = 'https://org.api.whatwechat.net/connections';
  public messageAPI = 'https://messaging.api.whatwechat.net';
  private userAPI = 'https://user.api.whatwechat.net/login/individual-member-access-token';
  private personAPI = 'https://person.api.whatwechat.net';

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
    return this.http.post(`https://user.api.whatwechat.net/login/individual-member-access-token`, post);
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
    return this.http.get<Object>(this.orgAPI + `/individual_members${page}`, httpOptions);
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
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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

  getMessage(page = 1, query = ''): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.messageAPI + `/messages?page=${page}${query}`, httpOptions);
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


  getDeliveryById(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(this.messageAPI + `/deliveries/${id}`, httpOptions);
  }

  getDeliveryStats(query, page: number = 1, parents: Array<ResourceParent> = []): Observable<Object> {
    // console.log('post.getDelivery');
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

    let observable = this.http.get(this.messageAPI + resourceParentPath + `/delivery-stats?page=${page}${query}`, httpOptions);
    if (query == '&selfDelivery=true') {
      console.log(observable);
    }
    // console.log('returning observable');
    return observable;
  }


  getDelivery(query, page: number = 1, parents: Array<ResourceParent> = []): Observable<Object> {
    // console.log('post.getDelivery');
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
    // console.log('returning observable');
    return observable;
  }

  decoded: any;

  getTotalDelivery(incoming = null) {
    let query = '?';
    if (this.decoded == undefined ) {
      this.decoded = jwt_decode(localStorage.getItem('token'));
    }

    if (incoming === true) {
      query += '&messageSenderUuid=' + this.decoded.im;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    return this.http.get(`${this.messageAPI}/deliveries${query}`, httpOptions);
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

  getFreeOnMessage(senderUuid, isAdmin = false): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    if (isAdmin) {
      return this.http.get(`${this.messageAPI}/free_on_messages`, httpOptions);
    }
    return this.http.get(`${this.messageAPI}/free_on_messages?sender.uuid=${senderUuid}`, httpOptions);
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

  messageOptionsGet(page, query = '') {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`${this.messageAPI}/message_options${page}${query}`, httpOptions);
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

  editGroupName(groupName, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.orgAPI}/individual_members/${id}`, {'groupName': groupName}, httpOptions);
  }

  editMemberEmail(email, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`${this.orgAPI}/individual_members/${id}`, {'email': email}, httpOptions);
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
    return this.http.get(`https://org.api.whatwechat.net?subdomain=${subdomain}`, httpOptions);
  }

  getLogoFilter(subdomain) {
    return this.http.get(`https://org.api.whatwechat.net/organisation/logourl/${subdomain}`);
  }

  getOrganisationCodeBySubdomain(subdomain) {
    return this.http.get(`https://org.api.whatwechat.net/organisation/org-code-by-subdomain/${subdomain}`);
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
    return this.http.get(`${this.apiBase}${route}`, httpOptions);
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

  messagePut(body, id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(`${this.messageAPI}${id}`, body, httpOptions);
  }

  freeOnMessageDelete(id): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.delete(`${this.messageAPI}${id}`, httpOptions);
  }

  /* .,Free on Message API */

  /* PERSON API */
  editInfoPerson(id, data): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.put(`${this.personAPI}${id}`, data, httpOptions);
  }

  getPersonByUuid(uuid): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(`${this.personAPI}/people?uuid=${uuid}`, httpOptions);
  }

  getPersonData(params): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/ld+json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(`${this.personAPI}/people${params}`, httpOptions);
  }

  /* /.PERSON API */
}
