import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  private uploadUrlReg: RegExp = /image_upload/;

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.getHeaders(req.urlWithParams);

    const request = req.clone({ setHeaders: headers });
    return next.handle(request);
  }

  private getHeaders(url) {
    const headers = {};
    if (!this.uploadUrlReg.test(url)) {
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
    }

    const token = this.authService.getToken();

    if (token) {
      headers['x-auth'] = `Bearer ${token}`;
    }

    return headers;
  }
}
