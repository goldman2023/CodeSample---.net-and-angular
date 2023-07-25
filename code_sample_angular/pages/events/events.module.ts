import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpcomingEventsComponent } from './upcoming_events/upcoming_events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { AddServiceProviderComponent } from './add-service-provider/add-service-provider.component';
import { AddFoodTicketComponent } from './add-food-ticket/add-food-ticket.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AgmCoreModule } from '@agm/core';
import { EventReportComponent } from './event-report/event-report.component';
import { TagInputModule } from 'ngx-chips';
import { SharedModule } from './../../shared/shared.module';
import { EventTypesComponent } from './ticket-type/ticket-type.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { SettlementReportComponent } from './settlement-report/settlement-report.component';
import { ViewConsumersComponent } from './view-consumers/view-consumers.component';
import { ServiceProviderReportComponent } from './service-provider-report/service-provider-report.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RefundComponent } from './refund/refund.component';
import { CalendarModule } from 'primeng/calendar';
import { environment } from './../../../environments/environment';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RefundHistoryComponent } from './refund-history/refund-history.component';
import { AddEventOrganizerComponent } from './add-event-organizer/add-event-organizer.component';
import { OrganizerEventComponent } from './organizer-event/organizer-event.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';

export const routes = [
  { path: '', component: UpcomingEventsComponent, pathMatch: 'full' },
  { path: 'add_event', component: CreateEventComponent, data: { breadcrumb: 'Add Event' } },
  { path: 'add_service/:id/:name', component: AddServiceProviderComponent, data: { breadcrumb: 'Add Service Provider' } },
  { path: 'add_organizer/:id/:name', component: AddEventOrganizerComponent, data: {breadcrumb: 'Add Event Organizer '} },
  { path: 'add_food_ticket/:id/:name', component: AddFoodTicketComponent, data: { breadcrumb: 'Add Food Ticket' } },
  { path: 'organizer_event', component: OrganizerEventComponent, data: { breadcrumb: 'Details'} },
  { path: 'billing_info', component: BillingInfoComponent, data: {breadcrumb: 'Billing Info'} },
  { path: 'event_details/:id', component: EventDetailsComponent, data: { breadcrumb: 'Event Details' } },
  {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' },
    children: [{ path: 'add_service/:id/:name', component: AddServiceProviderComponent, data: { breadcrumb: 'Add Service Provider' } }]
  },
  {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details'},
    children: [{ path: 'add_organizer/:id/:name', component: AddEventOrganizerComponent, data: { breadcrumb: 'Add Event Organizer' } }]
  },
  {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' },
    children: [{ path: 'add_food_ticket/:id/:name', component: AddFoodTicketComponent, data: { breadcrumb: 'Add Food Ticket' } }]
  },
  {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' },
    children: [{ path: 'edit_events/:id/:name', component: CreateEventComponent, data: { breadcrumb: 'Edit Food Ticket' } }]
  },
  {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' },
    children: [{ path: 'event_report/:id/:name', component: EventReportComponent, data: { breadcrumb: 'Event Report' } }]
  },
  { path: 'settlement_report/:id/:name', component: SettlementReportComponent, data: { breadcrumb: 'Settlement Report' } },
  {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' },
    children: [{
      path: 'viewConsumers_report/:name',  data: { breadcrumb: 'Consumers Report' }, children: [
        { path: '', component: ViewConsumersComponent },
        {
          path: 'refund/:userId', data: { breadcrumb: 'Refund' }, children: [
            { path: '', component: RefundComponent },
            { path: 'refund_history/:refundType', component: RefundHistoryComponent, data: { breadcrumb: 'Refund History' } }
          ]
        }]
    }]
  },
  {
    path: 'serviceProvider_report/:spId/:id/:name',
    component: ServiceProviderReportComponent, data: { breadcrumb: 'ServiceProvider Report' }
  },
  {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' }, children: [{
      path: 'event_report/:id/:name',
      data: { breadcrumb: 'Event Report' }, children: [{
        path: 'purchase_report/:id/:name', component: PurchaseReportComponent,
        data: { breadcrumb: 'Purchase Report' }
      }]
    }]
  }, {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' }, children: [{
      path: 'event_report/:id/:name',
      data: { breadcrumb: 'Event Report' }, children: [{
        path: 'settlement_report/:id/:name', component: SettlementReportComponent,
        data: { breadcrumb: 'Settlement Report' }
      }]
    }]
  }, {
    path: 'event_details/:id', data: { breadcrumb: 'Event Details' }, children: [{
      path: 'event_report/:id/:name',
      data: { breadcrumb: 'Event Report' }, children: [{
        path: 'settlement_report/:id/:name',
        data: { breadcrumb: 'Settlement Report' }, children: [{
          path: 'purchase_report/:id/:name', component: PurchaseReportComponent,
          data: { breadcrumb: 'Purchase Report' }
        }]
      }]
    }]
  }
];

@NgModule({
  imports: [TagInputModule, AngularDateTimePickerModule,
    SharedModule, CalendarModule, ImageCropperModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey_google,
      libraries: ['places']
    }),
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule,
    PipesModule,
    NgbModule,
    NgxChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ],
  declarations: [
    CreateEventComponent,
    AddServiceProviderComponent,
    AddFoodTicketComponent,
    EventDetailsComponent,
    UpcomingEventsComponent,
    EventTypesComponent,
    EventReportComponent,
    SettlementReportComponent,
    ViewConsumersComponent,
    ServiceProviderReportComponent,
    PurchaseReportComponent,
    RefundComponent,
    RefundHistoryComponent,
    AddEventOrganizerComponent,
    OrganizerEventComponent,
    BillingInfoComponent
  ]
})
export class EventsModule { }
