import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges{

  //On utilise ce decorateur
  //pour communiquer avec le 
  // composant parent 

  @Input()
  public rating :number=2 ;

  public star :number;

  constructor() { }

  ngOnChanges() {

   this.star=this.rating * 125/5 ;

  }



@Output()
  public starRatingClicked:EventEmitter <string> = new EventEmitter <string> ();
   

  public sendRating():void 
  {

    this.starRatingClicked.emit(`la note est : ${this.rating}`);
  }

 


}
