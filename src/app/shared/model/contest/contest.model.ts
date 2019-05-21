import {CompetitionModel} from '../football/competition.model';
import {PlayerModel} from './player.model';

export interface ContestModel {
  id: number;
  caption: string;
  owner: PlayerModel;
  type: string;
  competition: CompetitionModel;
  players: PlayerModel[];
  totalPlayer: number;
}
