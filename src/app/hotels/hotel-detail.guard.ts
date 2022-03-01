import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailGuard implements CanActivate {

constructor(private router :Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  

      const id = + route.url[1].path

      if(isNaN(id) || id<=0)
     
      {
      alert('hotel non connu')

      this.router.navigate(['/list'])
  
        return false ;

      }
    else
      return true;

  }
  
}
