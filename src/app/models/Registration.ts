import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Event } from "./Event";

export class Registration {
    uuid?: string;
    event?: string;
    middleName: string;
    birthDate: string;
    givenName: string;
    familyName: string;
    gender: string;
    email: string;
    phoneNumber: string;
    accessToken?: string;
}