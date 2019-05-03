import { ClubMembersComponent } from 'src/app/pages/club-members/club-members.component';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class Member {
    firstName: string;
    lastName: string;
    dateOfBirth: NgbDate;
    phone: string;
    company: string;
    role: string;
    email: string;
    password: string;
    status: string;

    // employerName: string;
    // jobTitle: string;
    // name: string;
}