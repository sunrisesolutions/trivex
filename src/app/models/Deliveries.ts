import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Registration } from "./Registration";

export class Delivery {
  jobTitle: string;
  profilePicture: string;
  name: string;
  message!: any;
  readAt: Date;
  recipientUuid: string;
}
