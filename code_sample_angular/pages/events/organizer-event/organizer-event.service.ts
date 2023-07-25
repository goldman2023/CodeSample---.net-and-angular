import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizerEventService {

  constructor(private apiService: ApiService) { }

  getEventDetails() {
    return this.apiService.get('organizer_event/');
  }
}
