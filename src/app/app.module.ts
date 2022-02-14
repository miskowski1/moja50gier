import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { OrderListModule } from 'primeng/orderlist';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PointsPipe } from './vote/points.pipe';
import { VoteComponent } from './vote/vote.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { GameComponent } from './game/game.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    PointsPipe,
    LoginComponent,
    AdminComponent,
    GameComponent,
    SummaryComponent
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
    InputTextModule,
    ConfirmDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    CardModule,
    ToolbarModule,
    FormsModule,
    PanelModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
