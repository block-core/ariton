import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'did',
  standalone: true,
})
export class DidPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const lastColonIndex = value.lastIndexOf(':');
      if (lastColonIndex !== -1) {
        const beforeColon = value.slice(0, lastColonIndex + 1);
        const afterColon = value.slice(lastColonIndex + 1);
        return beforeColon + afterColon.slice(0, 5) + '...' + afterColon.slice(-5);
      }
      return value.slice(0, 5) + '...' + value.slice(-5);
    }
    return value;
  }
}
