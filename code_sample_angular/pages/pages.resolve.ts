import { Injectable } from '@angular/core';
import { ApiService } from './../core/services/api.service';

import { Resolve } from '@angular/router';

@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}

  resolve() {
    return this.apiService.get('master');
  }
}
