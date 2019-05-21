import {TeamModel} from './team.model';

export interface SeasonModel {
  id: number;
  startDate: Date;
  endDate: Date;
  currentMatchday: number;
  availableMatchday: number;
  availableMatchPerDay: number;
  currentLeader: TeamModel;
}
