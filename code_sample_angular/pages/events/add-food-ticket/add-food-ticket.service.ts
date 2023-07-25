import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodTicketService {
  ticketGroupValue: Subject<any> = new Subject();
  private ticketValue = new BehaviorSubject<any>(null);
  public newTicketValue = this.ticketValue.asObservable();
  addToEventValue: any = []
  tabNo
  commissionId
  deleteId: Subject<any> = new Subject();
  addEventStatus: Subject<any> = new Subject();
  constructor(private apiService: ApiService) {
  }

  getMaster() {
    return this.apiService.get('master');
  }
  saveCut(value) {
    return this.apiService.post('tickets/commission', value);
  }
  saveTicketGroup(value) {
    return this.apiService.post('tickets/groups', value);
  }
  setTicketGroup(data) {
    this.ticketGroupValue.next(data)
  }
  deleteTicketGroup(id) {
    return this.apiService.delete('tickets/groups/' + id);
  }
  getTicket(id) {
    return this.apiService.get('tickets/home/' + id);
  }
  setTicket(data) {
    this.ticketValue.next(data)
  }
  currentTab(id) {
    this.tabNo = id
  }
  setCommissionId(id) {
    this.commissionId = id
  }
  giftTicketGroup(value) {
    return this.apiService.post('tickets/gift', value);
  }
  setDeleteId(id) {
    this.deleteId.next(id);
  }
  editCut(value) {
    return this.apiService.put('tickets/commission/' + value.commission_id, value);

  }
  addToEvent(value) {
    return this.apiService.post('tickets/add_to_event', value);

  }
  setAddEventStatus(id) {
    this.addEventStatus.next(id);
  }
}
