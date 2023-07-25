import { DashboardService } from './../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DashboardService]
})
export class OrdersComponent implements OnInit {
  noDataStyle;
  time;
  state;
  totalOrders;
  totalOrdersList = [{ is_flagged: true, user_id: '' }, { is_flagged: true, user_id: '' },
  { is_flagged: true, user_id: '' }, { is_flagged: true, user_id: '' }];
  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }
  ngOnInit() {
    this.time = this.route.snapshot.params.time
    this.state = Number(this.route.snapshot.params.state)
    if (this.state === 0) {
      this.state = ''
    }
    if (this.time == 0) {
      this.time = ''
    }
    this.consumerListTable();
  }
  consumerListTable() {
    const that = this;
    let column
    let dir
    $('#datatables').DataTable({
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      'aaSorting': [],
      columnDefs: [],
      'bLengthChange': false,
      'bFilter': false,
      oLanguage: {
        sProcessing: '<div class="browser-screen-loading-content">' +
          '<img src="assets/img/app/logo-foodeaze.png" class="img-fluid" alt="Responsive image" style="height: 50px; "">' +
          '<div class="loading-dots dark-gra"><i></i><i></i><i></i><i></i></div></div>'
      },
      ajax: (dataTablesParameters: any, callback) => {
        if (dataTablesParameters.order[0]) {
          column = dataTablesParameters.columns[dataTablesParameters.order[0].column].data;
          dir = dataTablesParameters.order[0].dir;
        } else {
          dir = ''
          column = ''
        }

        const page = $('#datatables').DataTable().page.info().page + 1
        $('#datatables').on('page.dt', () => {
          this.noDataStyle = false;

        });
        that.totalOrdersList.length = 0;
        const limit = 10;
        that.dashboardService.getActiveOrders(page, column, dir, this.state, this.time).subscribe(resp => {
          this.totalOrders = resp.meta.total_count
          that.noDataStyle = true;
          that.totalOrdersList = resp.data;

          callback({
            recordsTotal: resp.meta.total_count,
            recordsFiltered: resp.meta.total_count,
            data: []
          });
        });
      },
      columns: [{ data: 'order_id' }, { data: 'catering_type' }, { data: 'order_date' }, { data: 'event_date' },
      { data: 'user_name' }
      ]
    });
  }
}
