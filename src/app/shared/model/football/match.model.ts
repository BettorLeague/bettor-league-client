import {TeamModel} from './team.model';
import {SeasonModel} from './season.model';
import {ScoreModel} from './score.model';


export interface MatchModel {
  id: number;
  season: SeasonModel;
  utcDate: Date;
  status: string;
  matchday: number;
  stage: string;
  homeTeam: TeamModel;
  awayTeam: TeamModel;
  score: ScoreModel;
  lastUpdated: Date;
}
