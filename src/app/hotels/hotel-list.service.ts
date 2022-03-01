import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { Hotel, IHotel } from "../shared/models/hotel";


@Injectable(
{
    providedIn:'root'
}
)
export class HotelService {

private readonly URL= 'api/hotels';

   constructor(private http: HttpClient ,private activatedRoute:ActivatedRoute ,)
  {

  
  }


  public getHotels(): Observable<IHotel[]> 
  {
    return this.http.get<IHotel[]>(this.URL).pipe(
      tap(hotels => console.log('hotels: ', hotels)),
      catchError(this.handleError)
    );
  }
  public getHotelById(id: number): Observable<IHotel> {
    const url = `${this.URL}/${id}`;

    if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.http.get<IHotel>(url).pipe(
      catchError(this.handleError)
    );
  }

  public createHotel(hotel: IHotel): Observable<IHotel> {
   //Insertion de l'image par defaut
   
    hotel = {
      ...hotel,
      imageUrl: 'assets/img/hotel-room.jpg',
      id: null
    };
    return this.http.post<IHotel>(this.URL, hotel).pipe(
      catchError(this.handleError)
    );
  }

  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url = `${this.URL}/${hotel.id}2222`;

    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    );
  }

  public deleteHotel(id: number): Observable<{}> {
    const url = `${this.URL}/${id}`;

    return this.http.delete<IHotel>(url).pipe(
      catchError(this.handleError)
    );
  }

  private getDefaultHotel(): IHotel {
    return {
      id: 0,
      hotelName: null,
      description: null,
      price: null,
      rating: null,
      imageUrl: null
    };
  }

  private handleError(error: HttpErrorResponse) {

    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      //Error cote client ou cote reseau 

      console.error('An error occurred:', error.error.message);

      errorMessage = `An error occured: ${error.error.message}`;

    } else {
      // The backend returned an unsuccessful response code.
      // Erreur cote backend 
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage = `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Quelque choses sest mal passé, essayer à nouveau' +
      '\n' +
      errorMessage
    );
  }
}