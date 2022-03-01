import { Pipe, PipeTransform } from "@angular/core";

@Pipe(
{
  name:'remplacerVirgule'
}
)

export class ReplaceCommma implements PipeTransform
{
    transform(value:string):any {
       
        if(!! value)
        {
            value.replace(/./g  ,'/.');
        }
        else

         return '';
    }
    
}