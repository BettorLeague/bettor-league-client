import {Pipe, PipeTransform} from '@angular/core';
import {BettorUtils} from '../utils';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {

  transform(mainArr: any[], searchText: string, property: string): any {
    return BettorUtils.filterArrayByString(mainArr, searchText);
  }
}
