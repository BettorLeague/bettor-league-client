export class PronosticRequestModel {
  contestId: number;
  matchId: number;
  result: string;

  constructor(contestId: number, matchId: number, result: string) {
    this.contestId = contestId;
    this.matchId = matchId;
    this.result = result;
  }
}
