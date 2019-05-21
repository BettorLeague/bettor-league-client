import {AreaModel} from './area.model';

export interface TeamModel {
  id: number;
  area: AreaModel;
  name: string;
  shortName: string;
  tla: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  logo: string;
  founded: number;
  clubColors: string;
  stadium: string;
  totalUser: number;
}
