import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filtroRetorno'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter((val: any) => {
      let rVal = (val.id != null && val.id.toString().includes(args)) || (val.size != null && val.size.toLocaleLowerCase().includes(args)) || ( val.status != null && val.status.toString().includes(args)) || (val.statusText != null && val.statusText.toLocaleLowerCase().includes(args)) || (val.type != null && val.type.toLocaleLowerCase().includes(args)) || (val.url != null && val.url.toLocaleLowerCase().includes(args));

      return rVal;
    })

  }

}
