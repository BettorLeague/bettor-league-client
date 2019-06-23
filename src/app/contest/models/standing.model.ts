import {TeamModel} from '../../shared/model/football/team.model';

export class StandingModel {
  id: number;
  stage: string;
  type: string;
  table: StandingPositionModel[];
}

export class StandingPositionModel {
  draw: number;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  lost: number;
  playedGames: number;
  points: number;
  position: number;
  team: TeamModel;
  won: number;
}
