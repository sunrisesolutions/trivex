import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class Event {
    name: string;
    startedAt: NgbDate;
    endedAt: NgbDate;
    uuid: string;
    readOnly : true;
    timezone: string;
    title: string;
    subtitle: string;
    enabled: boolean;
    deleted: boolean;
}