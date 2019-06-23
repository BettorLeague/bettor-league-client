export class MessageRequestModel {
  content: string;
  playerId: number;

  constructor(content: string, playerId: number) {
    this.content = content;
    this.playerId = playerId;
  }
}
