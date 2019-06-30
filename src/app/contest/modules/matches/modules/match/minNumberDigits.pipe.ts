import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'minNumberDigit' })
export class MinNumberDigit implements PipeTransform {
  transform(value: string, size: number): string {
    const res = (size ? size : 4) - value.toString().length + 1;
    return Array(+(res > 0 && res)).join('0') + value;
  }
}
