export class ContestRequestModel {
  caption: string;
  competitionId: number;
  type: string;

  constructor(caption: string, competitionId: number, type: string = 'PRIVATE') {
    this.caption = caption;
    this.competitionId = competitionId;
    this.type = type;
  }
}
