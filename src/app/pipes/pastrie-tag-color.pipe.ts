import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pastrieTagColor'
})
export class PastrieTagColorPipe implements PipeTransform {

  transform(tag: string): string {
    return tag;
  }

}
