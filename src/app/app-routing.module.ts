import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { HotelDetailGuard } from './hotels/hotel-detail.guard';
import { HotelDetailComponent } from './hotels/hotel-detail/hotel-detail.component';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';

const routes: Routes = [
  
{path: 'list', component:HotelListComponent },

{path: 'hotel/:id',canActivate:[HotelDetailGuard], component:HotelDetailComponent },

{path: 'home', component:HomeComponent},

{path: 'hotel/:id/edit',canDeactivate:[HotelDetailComponent],component: HotelEditComponent},

{path: '', redirectTo :"home", pathMatch :'full'},

{path: '**',redirectTo :"home", pathMatch :'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
