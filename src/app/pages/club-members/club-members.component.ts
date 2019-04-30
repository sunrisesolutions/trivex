import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/Member';
import { PostService } from 'src/app/services/post.service';
import { headersToString } from 'selenium-webdriver/http';

export const MEMBERS: Member[] = [
  { firstName: 'Handsome', lastName: 'Bean', company: 'Mr. Bean solution Co., Ltd', role: 'Sales Manager', email: 'binh@sunrise.vn', phone: '+84 369140916', status: 'connect' } as Member,
]

@Component({
  selector: 'app-club-members',
  templateUrl: './club-members.component.html',
  styleUrls: ['./club-members.component.scss']
})
export class ClubMembersComponent implements OnInit {
  members = MEMBERS;
  gets: any[];
  constructor(private service: PostService) {

  
  }
  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        console.log(response.json())
        
      });
  }

}
