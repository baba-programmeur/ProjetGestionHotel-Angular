import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHotel } from '../models/hotel';


export class HotelData implements InMemoryDbService {

    createDb(): Record<string, IHotel[]> {

    const hotels: IHotel[] = [
      {
        id: 1,
        hotelName: 'Buea sweet life',
        description: 'Belle vue au bord de la mer',
        price: 230.5,
        imageUrl: "https://www.hotellevesque.com/mod/file/SliderFile/a87ff679a2f3e71d9181a67b7542122c.jpg?1607625468",
        rating: 3.5,
        tags: ['nouveau']
      }, {
        id: 2,
        hotelName: 'Marakech',
        description: 'Profitez de la vue sur les montagnes',
        price: 145.5,
        imageUrl: "https://www.hotellevesque.com/mod/file/SliderFile/a87ff679a2f3e71d9181a67b7542122c.jpg?1607625468",

        rating: 5,
        tags: ['nouveau']
      }, {
        id: 3,
        hotelName: 'Abudja new look palace',
        description: 'Séjour complet avec service de voitures',
        price: 120.12,
        imageUrl: "assets/img/image6.jpeg",
        rating: 4,
        tags: ['nouveau']
      }, {
        id: 4,
        hotelName: 'Cape town city',
        description: 'Magnifique cadre pour votre séjour',
        price: 135.12,
        imageUrl: "https://www.hotellevesque.com/mod/file/SliderFile/a87ff679a2f3e71d9181a67b7542122c.jpg?1607625468",

        rating: 2.5,
        tags: ['nouveau']
      }
    ];

    return { hotels };
  }

  genId(hotels: IHotel[]): number {
    return hotels.length > 0 ? Math.max(...hotels.map(hotel => hotel.id)) + 1 : 1;
  }

}