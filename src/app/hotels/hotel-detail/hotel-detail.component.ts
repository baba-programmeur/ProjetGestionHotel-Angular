import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHotel } from 'src/app/shared/models/hotel';
import { HotelService } from '../hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit,OnDestroy{

  private subscription: Subscription=new Subscription();

  constructor(

    private router:Router,
    private activatedRoute:ActivatedRoute ,

  private hotelService:HotelService)
  
  { }

  hotel :IHotel= <IHotel>{};

  ngOnInit(): void {

//+ permet de transformer la chaine en entier

const id = + this.activatedRoute.snapshot.paramMap.get('id');

  this.subscription.add(this.hotelService.getHotels().pipe(

      map((hotels:IHotel[])=>hotels.find(hotel => hotel.id===id))
    )

.subscribe((hotel => this.hotel=hotel) ))

  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();

  }

  public backToList(): void {
    this.router.navigate(['/list']);
  }

}
