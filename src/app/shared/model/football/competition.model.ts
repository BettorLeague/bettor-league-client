import {AreaModel} from './area.model';
import {SeasonModel} from './season.model';
import {CompetitionType} from './competition.type';
import {MatchModel} from './match.model';

export interface CompetitionModel {
  id: number;
  name: string;
  type: CompetitionType;
  code: string;
  logo: string;
  lastUpdated: Date;
  area: AreaModel;
  currentSeason: SeasonModel;
  availableStage: string[];
  availableGroup: string[];
  matches: MatchModel[];
}
