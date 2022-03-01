import { Component, OnInit } from '@angular/core';
import { Hotel, IHotel } from 'src/app/shared/models/hotel';
import { HotelService } from '../hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  constructor(private hotelListService:HotelService) { }
  
  public title='liste Hotels';

public showBadge:boolean ;

  public NewToggle():void
  {
    this.showBadge=!this.showBadge
  }

  private _hotelFilter ='';

 // public hotels: IHotel[]=[];

  public filteredHotels: IHotel[]=[];

  public hotels :IHotel[]=[] ;

  private errMss :string

  ngOnInit():void  

  {

  this.hotelListService.getHotels().subscribe(
   {
    next:(hotels:IHotel[]) => 
      {
        this.hotels=hotels ;

        this.filteredHotels=this.hotels ;
      },

      error : error => this.errMss=error
});

  this._hotelFilter=this.hotelFilter ;

}
  public set hotelFilter(nomHotel:string)
  {
     this._hotelFilter=nomHotel

     this.filteredHotels =this.hotelFilter ? this.rechercheParFiltre(this.hotelFilter): this.hotels;

  }

  public get hotelFilter():string
  {

    return this._hotelFilter
  }

  private rechercheParFiltre(nomHotel:string):IHotel[]
  {
      nomHotel=nomHotel.toLocaleLowerCase();

    const hotelfiltre=  this.hotels.filter((hotel:IHotel)=>
    
      hotel.hotelName.toLocaleLowerCase().indexOf(nomHotel) != -1
      )

    return hotelfiltre
  }

  public rate:string ;
  
  public startRating(message:string)
  {
    this.rate=message ;
  }

}
