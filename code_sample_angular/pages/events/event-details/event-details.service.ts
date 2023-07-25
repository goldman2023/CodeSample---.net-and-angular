import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class EventDetailsService {

    constructor(private apiService: ApiService) {
    }

    getEventDetails(id) {
        return this.apiService.get('events/' + id);
    }

    isOrganizer() {
        return this.apiService.get('is_organizer');
    }
}
