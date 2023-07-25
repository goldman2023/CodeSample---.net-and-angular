import { error } from '@angular/compiler/src/util';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { AddServiceProviderService } from './add-service-provider.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { ToasterComponent } from './../../../shared/toaster';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-add-service-provider',
  templateUrl: './add-service-provider.component.html',
  styleUrls: ['./add-service-provider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AddServiceProviderService]

})
export class AddServiceProviderComponent implements OnInit {
  noDataStyle;

  public modalRef: NgbModalRef;
  id
  serviceProviders = []
  serviceProvider: any = [];
  serviceProviderAdd: any = [];
  eventName
  expired
  constructor(private toasterComponent: ToasterComponent, private route: ActivatedRoute,
    private modalService: NgbModal,
    private addServiceProviderService: AddServiceProviderService) { }

  ngOnInit() {
    this.eventName = this.route.snapshot.params.name;

    this.id = this.route.snapshot.params.id;
    this.addServiceProvider();
    this.serviceProvider.length = 0;

    this.addServiceProviderService.getServiceProvider(this.id).subscribe(data => {
      this.expired = data.data.is_expired
      this.serviceProvider = data.data.providerList;
    })
  }

  addRemoveSP(e: Event, sp_id, user_id) {
    const index = this.serviceProviders.findIndex(function (item, i) {
      return item.sp_id === sp_id
    });
    if (index === -1) {
      this.serviceProviders.push({ sp_id, user_id })
    } else {
      this.serviceProviders.splice(index, 1);
    }
  }

  invite() {
    this.addServiceProviderService.inviteServiceProviders(this.id, this.serviceProviders).subscribe(data => {
      const message = 'Service Provider invited successfully'
      const alert_type = 'success'
      const title = 'Success'
      this.toasterComponent.openToast(message, alert_type, title)
      this.addServiceProviderService.getServiceProvider(this.id).subscribe(resp => {
        this.serviceProvider = resp.data.providerList;
      })
    }, err => {
      const message = err.error.message
      const alert_type = 'error'
      const title = 'Error'
      this.toasterComponent.openToast(message, alert_type, title)
    })
  }

  addServiceProvider(value?) {
    const that = this;
    let column
    let dir
    $('#datatables').DataTable({
      pagingType: 'full_numbers',
      pageLength: 5,
      serverSide: true,
      processing: true,
      'aaSorting': [],
      columnDefs: [
        { orderable: false, targets: 0 }
      ],
      'bLengthChange': false,
      'bFilter': false,
      oLanguage:
      {
        sProcessing: '<div class="browser-screen-loading-content">' +
          '<img src="assets/img/app/logo-foodeaze.png" class="img-fluid" style="height: 50px; "">' +
          '<div class="loading-dots dark-gra"><i></i><i></i><i></i><i></i></div></div>'
      },
      ajax: (dataTablesParameters: any, callback) => {
        if (dataTablesParameters.order[0]) {
          column = dataTablesParameters.columns[dataTablesParameters.order[0].column].data;
          dir = dataTablesParameters.order[0].dir;
        }
        if (dir === undefined) {
          dir = ''
        }
        if (column === undefined) {
          column = ''
        }
        const page = $('#datatables').DataTable().page.info().page + 1
        $('#datatables').on('page.dt', () => {
          this.noDataStyle = false;

        });
        this.serviceProviderAdd.length = 0;

        this.addServiceProviderService.getServiceProviderAdd(this.id, page, column, dir, value).subscribe(data => {
          this.serviceProviderAdd = data.data;
          that.noDataStyle = true;
          this.serviceProviderAdd.forEach(item => {
            if (item.is_checked === true) {
              const sp_id = item.sp_id
              const user_id = item.user_id
              this.serviceProviders.push({ sp_id, user_id })
            }
          });
          callback({
            recordsTotal: data.meta.total_count,
            recordsFiltered: data.meta.total_count,
            data: []
          });
        });
      },
      columns: [{ data: '' }, { data: 'first_name' },
      { data: 'last_name' }, { data: 'email' },
      { data: 'restaurant_name' }, { data: 'address' }, { data: 'city' }, { data: 'state' }]
    });
  }
  search(form) {
    if (form.valid) {
      const table = $('#datatables').DataTable();
      table.destroy()
      this.noDataStyle = false;
      if (form.value.email) {
        form.value.email = encodeURIComponent(form.value.email);
      }
      this.addServiceProvider(form.value);
    }
  }
  csv() {
    this.addServiceProviderService.csvExport(this.id).subscribe(data => {
      const blob = new Blob([data.data.csv], { type: 'text/csv' })
      saveAs(blob, data.data.filename)
    }, err => {
      const alert_type = 'erorr'
      const title = 'Error'
      this.toasterComponent.openToast(err.error.message, alert_type, title)
    })

  }
}

