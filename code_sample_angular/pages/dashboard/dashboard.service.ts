import { Injectable } from '@angular/core';
import { ApiService } from './../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private apiService: ApiService) {
  }
  getStates() {
    return this.apiService.get('master');
  }
  getDashboardDetails(time?, state?) {
    if (state === undefined) {
      return this.apiService.get('dashboard?time=' + time);

    }
    return this.apiService.get('dashboard?time=' + time + '&state=' + state);
  }
  getMasterData() {
    return this.apiService.get('master');

  }
  getActiveOrders(page?, column?, dir?, state?, time?) {
    return this.apiService.get('orders/active/' + page + '?column=' + column + '&dir=' + dir +
      '&state=' + state + '&time=' + time);

  }
  getActiveBids(page?, column?, dir?, state?, time?) {
    return this.apiService.get('bids/active/?page=' + page + '&column=' + column + '&dir=' + dir +
      '&state=' + state + '&time=' + time
    );
  }
  getAcceptedBids(page?, column?, dir?, state?, time?) {
    return this.apiService.get('bids/accepted/?page=' + page + '&column=' + column + '&dir=' + dir +
      '&state=' + state + '&time=' + time
    );
  }
}
