import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { NgxPaginationModule } from 'ngx-pagination';

import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SearchPipe } from '../app/service/search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatSortModule,
    MatProgressBarModule,
    FormsModule
  ],
  providers: [SearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
