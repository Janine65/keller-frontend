import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringDate',
})
export class StringDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: unknown, format: string): string | null {
    if (typeof(value) == 'object') 
      return this.datePipe.transform(value as Date, format);

    if (typeof(value) == 'string' && value != '')
      return this.datePipe.transform(new Date(value), format);

    return null;
  }
}
