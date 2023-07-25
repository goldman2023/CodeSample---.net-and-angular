import { SharedModule } from './shared/shared.module';
import { LoginService } from './pages/auth/services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule } from 'angular-calendar';
import { ToastrModule } from 'ngx-toastr';
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { CoreModule } from './core';
import { AppRoutingModule } from './app.routing';
import { APP_CONFIG, AppConfig } from './config/app.config';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ResetPasswordComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    }),
    NgxStripeModule.forRoot('pk_live_I7faC3F8EPNBcbltI6VYm7dZ'),
    CalendarModule.forRoot(),
  ],
  providers: [AppSettings, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
