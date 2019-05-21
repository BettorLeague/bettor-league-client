import {ScoreResultType} from './score.result.type';
import {ScoreDurationType} from './score.duration.type';

export interface ScoreDetailModel {
  homeTeam: number;
  awayTeam: number;
}

export interface ScoreModel {
  id: number;
  winner: ScoreResultType;
  duration: ScoreDurationType;
  fullTime: ScoreDetailModel;
  halfTime: ScoreDetailModel;
  extraTime: ScoreDetailModel;
  penalties: ScoreDetailModel;
}
