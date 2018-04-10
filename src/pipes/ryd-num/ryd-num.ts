import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RydNumPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'rydNum',
})
export class RydNumPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(num: any, i: number) {
    if (num == 0) {
      return 0;
    } else if (!num) {
      return null;
    } else if (typeof num !== 'number') {
      num = num - 0;//将string类型转换成number类型
      return num.toFixed(i);
      // return '请传入number类型';
    }
    else {
      let newNum = num.toFixed(i);
      return newNum;
    }
  }
}
