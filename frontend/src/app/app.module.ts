import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BookFlightComponent,
    ViewDetailsComponent,
    UpdateDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
