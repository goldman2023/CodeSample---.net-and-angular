import { BidsComponent } from './bids/bids.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { OrdersComponent } from './orders/orders.component';
export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'orders/:state/:time', component: OrdersComponent, pathMatch: 'full', data: { breadcrumb: 'New Orders' } },
  { path: 'bids/:state/:time', component: BidsComponent, pathMatch: 'full', data: { breadcrumb: 'Active Bids' } },
  { path: 'accepted_bids/:state/:time', component: BidsComponent, pathMatch: 'full', data: { breadcrumb: 'Accepted Bids' } }

];

@NgModule({
  imports: [
    Daterangepicker,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent, OrdersComponent, BidsComponent
  ]
})

export class DashboardModule { }
