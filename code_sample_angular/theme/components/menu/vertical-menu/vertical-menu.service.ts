import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class IsOrganizerService {

  constructor(private apiService: ApiService) {
  }

  isOrganizer() {
    return this.apiService.get('is_organizer');
  }
}
