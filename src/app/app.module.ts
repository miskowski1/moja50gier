import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { RippleModule } from 'primeng/ripple';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoteComponent } from './vote/vote.component';
import { PointsPipe } from './vote/points.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    PointsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    OrderListModule,
    ButtonModule,
    RippleModule,
    BadgeModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
