import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private api_url = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) {}

  post(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post(`${this.api_url}${path}`,  params );
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.api_url}${path}`,  {params} );
  }

  put(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(`${this.api_url}${path}`,  params );
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${this.api_url}${path}`,  {params} );
  }
  patch(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.patch(`${this.api_url}${path}`,  params );
  }
}





