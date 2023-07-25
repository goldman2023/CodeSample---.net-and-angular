import { UpcomingEventsService } from './../upcoming_events/upcoming_events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetailsService } from './event-details.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToasterComponent } from './../../../shared/toaster';
import * as dateformat from 'dateformat';
declare const $: any;

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [EventDetailsService]

})
export class EventDetailsComponent implements OnInit {
  id;
  singleDayEvent = false;
  imagePath;
  start_date;
  end_date;
  end_time;
  start_time;
  eventdetails;
  sponserPhotos;
  isOrganizer: any;
  constructor(private router: Router, private eventDetailsService: EventDetailsService,
    private route: ActivatedRoute, private upcomingEventsService: UpcomingEventsService,
    private toasterComponent: ToasterComponent) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getEventDetails();
    this.isOrganizer = false;
    this.eventDetailsService.isOrganizer().subscribe(data => {
      if (data.data.is_organizer === true) {
        this.isOrganizer = true;
      }
    });
  }
  getEventDetails() {
    this.eventDetailsService.getEventDetails(this.id).subscribe(data => {
      this.eventdetails = data.data
      this.sponserPhotos = this.eventdetails.sponser_photos
      this.start_date = dateformat(this.eventdetails.start_date, 'UTC:dddd, mmmm dS, yyyy')
      this.end_date = dateformat(this.eventdetails.end_date, 'UTC:dddd, mmmm dS, yyyy')
      if (this.start_date === this.end_date) {
        this.singleDayEvent = true
      }
      this.end_time = dateformat(this.eventdetails.end_date + ' ' + this.eventdetails.end_time, 'h:MM TT')
      this.start_time = dateformat(this.eventdetails.start_date + ' ' + this.eventdetails.start_time, 'h:MM TT')
    })
  }
  delete(id) {
    this.upcomingEventsService.eventDelete(id).subscribe(data => {
      this.router.navigate(['/events'])
      const message = 'Event Deleted Successfully'
      const alert_type = 'success'
      const title = 'Success'
      this.toasterComponent.openToast(message, alert_type, title)
      this.getEventDetails()
    })
  }

  viewImage(value) {
  this.imagePath = value
  $('#viewImage').modal('show');

}
}
