import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Registration } from "./Registration";

export class Delivery {
  arrayOptions: Array<any>;
  selectedOptions: Array<any>;
  messageId: number;
  jobTitle: string;
  profilePicture: string;
  id: number;
  name: string;
  message!: any;
  readAt: Date;
  recipientUuid: string;
}
