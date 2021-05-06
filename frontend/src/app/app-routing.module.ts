import { viewClassName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

const routes: Routes = [
  {path:'book',component:BookFlightComponent},
  {path:'view',component:ViewDetailsComponent},
  {path:'update/:bookingId/:flightId',component:UpdateDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
