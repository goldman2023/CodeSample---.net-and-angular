import { state } from '@angular/animations';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  setTime
  setState
  listStates: any = [];
  state = '';
  time = '';
  isFoodTruck
  eventsLength;
  dashboardData: any = {};
  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private router: Router) {
  }
  ngOnInit() {
    this.dashboardService.getMasterData().subscribe(data => {
      this.listStates = data.data.states
    })
    this.dashboardService.getDashboardDetails().subscribe(data => {
      this.dashboardData = data.data;
      this.eventsLength = this.dashboardData.upcoming_events.length
    }, error => {
      this.eventsLength = 0
    })
  }
  filter() {
    this.dashboardService.getDashboardDetails(this.time, this.state).subscribe(data => {
      this.dashboardData = data.data;
      this.eventsLength = this.dashboardData.upcoming_events.length

    })
  }
  setStateandTime() {
    if (this.state === '') {
      this.setState = 0
    } else {
      this.setState = this.state
    }
    if (this.time === '') {
      this.setTime = 0
    } else {
      this.setTime = this.time
    }
  }
  consumerList() {
    this.setStateandTime();
    this.router.navigate(['/manage_consumer', this.setState, this.setTime])
  }
  providerList() {
    this.setStateandTime();
    this.isFoodTruck = false;
    this.router.navigate(['/service_provider', this.setState, this.setTime, this.isFoodTruck])
  }
  orderList() {
    this.setStateandTime();
    this.router.navigate(['/dashboard/orders', this.setState, this.setTime])
  }
  bidsList() {
    this.setStateandTime();
    this.router.navigate(['/dashboard/bids', this.setState, this.setTime])
  }
  acceptedBidsList() {
    this.setStateandTime();
    this.router.navigate(['/dashboard/accepted_bids', this.setState, this.setTime])
  }
  foodTruck() {
    if (this.state === '') {
      this.setState = 0
    } else {
      this.setState = this.state
    }
    if (this.time === '') {
      this.setTime = 0
    } else {
      this.setTime = this.time
    }
    this.isFoodTruck = true;
    this.router.navigate(['/service_provider', this.setState, this.setTime, this.isFoodTruck])
  }
  revenueEarned() {
    $('#disableContent').modal('show');
  }
}
