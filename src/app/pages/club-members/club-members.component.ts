import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/Member';

export const MEMBERS: Member[] = [
  { firstName: 'Handsome', lastName: 'Bean', company: 'Mr. Bean solution Co., Ltd', role: 'Sales Manager', email: 'binh@sunrise.vn', phone: '+84 369140916', status: 'connect' } as Member,
  { firstName: 'Peter Bean', lastName: 'the handsome', company: 'Magenta Consulting Services Pte., Ltd', role: 'Technical Lead', email: 'peter@magenta-wellness.com', phone: '+84 834567247', status: 'pending' } as Member,
  { firstName: 'George Washington', lastName: '- not so handsome yet legendary', company: 'The White House - United States of America', role: 'First President', email: 'george-washington@whitehouse.gov', phone: '+84 369140916', status: 're-connect' } as Member,
  { firstName: 'Handsome', lastName: 'Bean', company: 'Mr. Bean solution Co., Ltd', role: 'Sales Manager', email: 'binh@sunrise.vn', phone: '+84 369140916', status: 'connect' } as Member
]

@Component({
  selector: 'app-club-members',
  templateUrl: './club-members.component.html',
  styleUrls: ['./club-members.component.scss']
})
export class ClubMembersComponent implements OnInit {
  members = MEMBERS;

  constructor() { }

  ngOnInit() {
  }

}
