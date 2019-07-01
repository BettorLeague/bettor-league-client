import {MatchModel} from '../../../../shared/model/football/match.model';
import {PlayerModel} from '../../../../shared/model/contest/player.model';

export class PronosticModel {
  id: number;
  match: MatchModel;
  player: PlayerModel;
  result: PronosticResultModel;
}

export enum PronosticResultModel {
  HOME = 'HOME',
  AWAY = 'AWAY',
  DRAW = 'DRAW'
}