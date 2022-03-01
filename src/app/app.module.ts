import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';

import { registerLocaleData } from '@angular/common';

import localFr from '@angular/common/locales/fr' ;
import { ReplaceCommma } from './shared/pipe/replace-comma';
import { StarRatingComponent } from './shared/star-rating/star-rating/star-rating.component';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HotelData } from './shared/api/hotel.data';

registerLocaleData(localFr,'fr')

@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    ReplaceCommma,
    StarRatingComponent,
    HotelDetailComponent,
    HotelEditComponent,
    StarRatingComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forFeature(HotelData)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
