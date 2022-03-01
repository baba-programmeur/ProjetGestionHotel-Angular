import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelEditComponent } from '../hotels/hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanActivate, CanDeactivate<unknown> {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  
  canDeactivate(
    component: HotelEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(component.hotelForm.dirty)

      {
       const hotelName= component.hotelForm.get('hotelName') || 'Nouveau Hotel';

       confirm(`Souhaitez vous annulez les modification effectuees sur ${hotelName}` )

      }
    
  return true;
  }
  
}
