import {PlayerModel} from '../../../../shared/model/contest/player.model';

export class MessageModel {
  content: string;
  date: Date;
  id: number;
  player: PlayerModel;
  type: string;
}
