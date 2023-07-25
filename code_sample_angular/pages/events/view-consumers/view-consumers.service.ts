import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ViewConsumersService {

  constructor(private apiService: ApiService) {
  }

  getConsumerEventList(id) {
    return this.apiService.get('events/' + id + '/consumer_list');
  }
  consumerEarnings(id, consumerId) {
    return this.apiService.get('events/' + id + '/consumer/' + consumerId + '/earnings');
  }
  consumerRedeem(id, consumerId) {
    return this.apiService.get('events/' + id + '/consumer/' + consumerId + '/redeem');
  }

  consumerRefund(id, consumerId, transactionId?) {
    if (transactionId === undefined) {
      transactionId = ''
    }
    return this.apiService.get('events/' + id + '/consumer/' + consumerId + '/purchases?transaction_id=' + transactionId);
  }

  consumerRefundUsed(id, consumerId, businessName?) {
    if (businessName === undefined) {
      businessName = ''
    }
    return this.apiService.get('events/' + id + '/redeem/' + consumerId + '/?business_name=' + businessName);
  }

  consumerRefundGifted(id, consumerId) {
    return this.apiService.get('events/' + id + '/gift_tickets/' + consumerId);
  }

  refundHistory(id, consumerId) {
    return this.apiService.get('events/' + id + '/refund_unused/' + consumerId);
  }

  refundHistoryUsed(id, consumerId) {
    return this.apiService.get('events/' + id + '/refund_used/' + consumerId);
  }

  refund(value, refundType = 'unused') {
    if (refundType === 'gifted') {
      return this.apiService.post('events/gifted_tickets_refund', value);
    } else if (refundType === 'used') {
      return this.apiService.post('events/refund_used', value);
    } else {
      return this.apiService.post('events/consumer/refund', value);
    }
  }
  csvExport(id) {
    return this.apiService.get('events/' + id + '/consumer_list/csv');

  }
}
