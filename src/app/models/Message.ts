export class Message {
  uuid: string;
  subject: string;
  body: string;
  senderUuid: string;
  responsesReceivable: boolean;
  createdAt: Date;
  optionSet: Array<any>;
}
