import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class LoginService {
  constructor(private apiService: ApiService
  ) {
  }
  login(value) {
    return this.apiService.post('login', value);
  }
  forgot_password(value) {
    return this.apiService.post('forgot_password', value);
  }
  change_password(value) {
    return this.apiService.patch('change_password', value);
  }
  reset_password(value) {
    return this.apiService.post('reset_password', value);
  }
  isOrganizer() {
    return this.apiService.get('is_organizer');
  }
}
