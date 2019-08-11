import { PostService } from 'src/app/services/post.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  membersOfConnect: Array<any>[]=[];
  constructor() { }

}
