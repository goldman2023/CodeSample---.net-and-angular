import { UpcomingEventsService } from './../upcoming_events/upcoming_events.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizerEventService } from './organizer-event.service';
import { ToasterComponent } from './../../../shared/toaster';
import * as dateformat from 'dateformat';
declare const $: any;

@Component({
  selector: 'app-organizer-event',
  templateUrl: './organizer-event.component.html',
  styleUrls: ['./organizer-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [OrganizerEventService]
})
export class OrganizerEventComponent implements OnInit {
  id: any;
  singleDayEvent = false;
  imagePath: any;
  start_date: any;
  end_date: any;
  end_time: any;
  start_time: any;
  eventdetails: any;
  sponserPhotos: any;

  constructor(private router: Router, private organizerEventService: OrganizerEventService,
    private route: ActivatedRoute, private upcomingEventsService: UpcomingEventsService,
    private toasterComponent: ToasterComponent) { }

  ngOnInit() {
    this.organizerEventService.getEventDetails().subscribe(data => {
      this.eventdetails = data.data;
      this.sponserPhotos = this.eventdetails.sponser_photos;
      this.start_date = dateformat(this.eventdetails.start_date, 'UTC:dddd, mmmm dS, yyyy');
      this.end_date = dateformat(this.eventdetails.end_date, 'UTC:dddd, mmmm dS, yyyy');
      if (this.start_date === this.end_date) {
        this.singleDayEvent = true;
      }
      this.end_time = dateformat(this.eventdetails.end_date + ' ' + this.eventdetails.end_time, 'h:MM TT');
      this.start_time = dateformat(this.eventdetails.start_date + ' ' + this.eventdetails.start_time, 'h:MM TT');
      this.id = this.eventdetails.id;
    });
  }
  viewImage(value: any) {
    this.imagePath = value;
    $('#viewImage').modal('show');
  }
}
