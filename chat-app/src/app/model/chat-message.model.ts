export class ChatMessage {
  id: string;
  fromUserId: string;
  toUserId: string;

  email?: string;
  userName?: string;
  message?: string;
  timeSent?: Date | any;
}
