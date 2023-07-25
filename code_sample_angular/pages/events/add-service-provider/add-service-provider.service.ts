import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class AddServiceProviderService {

    constructor(private apiService: ApiService) {
    }

    getServiceProvider(id) {
        return this.apiService.get('events/' + id + '/provider_list');
    }
    getServiceProviderAdd(id, page, column, dir, value?) {
        if (!value) {
            return this.apiService.get
                ('events/' + id + '/provider_add_list?limit=5&page=' + page + '&column=' + column + '&dir=' +
                dir);
        } else {
            return this.apiService.get
                ('events/' + id + '/provider_add_list?limit=5&page=' + page + '&column=' + column + '&dir=' +
                dir + '&first_name=' + value.first_name + '&last_name=' + value.last_name + '&email=' +
                value.email + '&restaurant_name=' + value.restaurant_name + '&address=' +
                value.address + '&city=' + value.city + '&state=' + value.state);
        }
    }
    inviteServiceProviders(id, invitees) {
        return this.apiService.post('events/' + id + '/provider_add', invitees);
    }
    csvExport(id) {
        return this.apiService.get('events/' + id + '/provider_list/csv');
    }
}
