import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BillingInfoService {

  constructor(private apiService: ApiService) { }

  isConnected() {
    return this.apiService.get('stripe/is_connected');
  }
  checkAccount() {
    return this.apiService.get('stripe/check_account');
  }
  createAccount(value: any) {
    return this.apiService.post('stripe/create_account', value);
  }
  retrieveAccount() {
    return this.apiService.get('stripe/retrieve_account');
  }
}
