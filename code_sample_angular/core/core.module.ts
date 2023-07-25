import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptors/http.header.interceptor';
import { HttpErrorInterceptor } from './interceptors/http.error.interceptor';

import {
  ApiService,
  AuthService,
  ErrorsHandler
} from './services';
import { AuthGuard } from './guards';

import { NetworkDetectionModule } from './components/network-detection/network-detection.module';

@NgModule({
  imports: [
    CommonModule,
    NetworkDetectionModule
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    AuthService,
    ApiService,
    AuthGuard
  ],
  exports: [
    NetworkDetectionModule
  ]
})
export class CoreModule { }
