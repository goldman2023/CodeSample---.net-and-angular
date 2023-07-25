import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import { FoodTicketService } from './add-food-ticket.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
declare const $: any;
import { ToasterComponent } from './../../../shared/toaster';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, RadioControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-add-food-ticket',
  templateUrl: './add-food-ticket.component.html',
  styleUrls: ['./add-food-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [FoodTicketService]

})
export class AddFoodTicketComponent implements OnInit {
  tabs: any = []
  ticketType: any;
  foodticketTypes;
  commissionId
  eventId
  deletetId
  giftId
  eventName
  parentSubject: Subject<any> = new Subject();
  public ticketGroupForm: FormGroup
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'MM-dd-yyyy hh:mm a',
    defaultOpen: false
  }
  submit
  ticketGroupValue
  dateValidationMessage
  constructor(private fb: FormBuilder,
    private toasterComponent: ToasterComponent, private foodTicketService: FoodTicketService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.setTicketType(1)
    this.eventName = this.route.snapshot.params.name;
    this.eventId = this.route.snapshot.params.id;
    this.foodTicketService.getTicket(this.eventId).subscribe(data => {
      this.foodTicketService.getMaster().subscribe(value => {
        this.foodticketTypes = value.data.foodticket_types

        for (let i = 0; i < data.data[0].fe_foodticket_commissions.length; i++) {
          for (let j = 0; j < this.foodticketTypes.length; j++) {

            if (data.data[0].fe_foodticket_commissions[i].foodticket_type_id === this.foodticketTypes[j].id) {
              this.foodticketTypes[j].checked = true
              this.tabs.push(this.foodticketTypes[j].id)

            }

          }
        }
        this.tabs = this.tabs.map(String)

      })
      this.foodTicketService.setTicket(data.data)
    })
    this.ticketGroupForm = this.fb.group({
      'name': [null, Validators.required],
      'quantity': [null, [
        Validators.required, Validators.pattern('^[0-9]*$')
      ]],
      'cost': [null, [
        Validators.required, Validators.pattern('^[0-9]*$')
      ]],
      'price_per_ticket': [null, Validators.required],
      'from_date': [this.date, Validators.required],
      'to_date': [this.date, Validators.required],
      'limit': [null, [
         Validators.pattern('^[0-9]*$')
      ]],
      'from_time': [null],
      'to_time': [null],
    })
    this.onChanges();

  }
  onChanges(): void {
    this.ticketGroupForm.get('cost').valueChanges.subscribe(val => {
      if (val < 1) {
        this.invalidCost = true
      } else {
        this.invalidCost = false

      }
    });
  }
  addTab(event) {
    const value = event.target.value
    const index = this.tabs.indexOf(value)
    if (index > -1) {
      this.tabs.splice(index, 1);
    } else {
      this.tabs.push(value)
    }

  }
  enable(value) {
    const index = this.tabs.indexOf(value.toString())
    if (index > -1) {
      return false;
    } else {
      return true;
    }
  }
  setTicketType(id) {
    this.ticketType = id
    this.foodTicketService.currentTab(id)
  }


  save(value) {
    value.event_id = this.eventId
    value.ticket_type_id = this.ticketType
    if (Number(value.service_provider_cut) + Number(value.foodeaze_cut) + Number(value.event_organizer_cut) === 100) {
      this.foodTicketService.saveCut(value).subscribe(data => {
        this.commissionId = data.data.commission_id;
        this.foodTicketService.setCommissionId(this.commissionId)
        const message = 'Digital Ticket saved successfully'
        const alert_type = 'success'
        const title = 'Success'
        this.toasterComponent.openToast(message, alert_type, title)
      })
    } else {
      const message = 'Sum of cuts should be 100'
      const alert_type = 'error'
      const title = 'Error'
      this.toasterComponent.openToast(message, alert_type, title)

    }
  }
  edit(value) {
    if (Number(value.service_provider_cut) + Number(value.foodeaze_cut) + Number(value.event_organizer_cut) === 100) {
      this.foodTicketService.editCut(value).subscribe(data => {
        const message = 'Digital Ticket updated successfully'
        const alert_type = 'success'
        const title = 'Success'
        this.toasterComponent.openToast(message, alert_type, title)
      })
    } else {
      const message = 'Sum of cuts should be 100'
      const alert_type = 'error'
      const title = 'Error'
      this.toasterComponent.openToast(message, alert_type, title)
    }
  }
  saveTicket(value) {
    value.foodeaze_event_id = this.eventId
    value.ticket_type_id = this.ticketType
    if (this.commissionId) {

      value.commission_id = this.commissionId
    }
    if (!value.price_per_ticket) {
      value.price_per_ticket = value.cost / value.quantity
    }
    this.foodTicketService.saveTicketGroup(value).subscribe(data => {
      this.foodTicketService.setTicketGroup(data.data)
      const message = 'Ticket Group created successfully.'
      const alert_type = 'success'
      const title = 'Success'
      this.toasterComponent.openToast(message, alert_type, title)
    }, error => {
      this.foodTicketService.setTicketGroup(error)

    })
  }
  deleteTicket(id) {
    this.deletetId = id
    $('#disableContent').modal('show');
  }
  deleteGroup() {
    this.foodTicketService.deleteTicketGroup(this.deletetId).subscribe(data => {
      this.foodTicketService.setDeleteId(this.deletetId)
      const message = 'Ticket group successfully deleted.'
      const alert_type = 'success'
      const title = 'Success'
      this.toasterComponent.openToast(message, alert_type, title)
    }, error => {
      const message = error.error.message
      const alert_type = 'error'
      const title = 'Error'
      this.toasterComponent.openToast(message, alert_type, title)
    })
  }
  giftTicket(id) {
    this.giftId = id
    $('#giftContent').modal('show');

  }
  giftTo(form) {
    form.value.foodeaze_event_id = this.eventId
    form.value.foodticket_group_id = this.giftId
    if (form.valid) {
      this.foodTicketService.giftTicketGroup(form.value).subscribe(data => {
        $('#giftContent').modal('hide');
        form.submitted = false
        form.reset()
        const message = 'Successfully gifted.'
        const alert_type = 'success'
        const title = 'Success'
        this.toasterComponent.openToast(message, alert_type, title)
        this.foodTicketService.getTicket(this.eventId).subscribe(value => {
          if (value !== null) {
            value.data[0].fe_foodticket_commissions.forEach(element => {
              if (element.foodticket_type_id === this.ticketType) {
                this.foodTicketService.setTicketGroup(element)
              }
            });
          }
        })
      }, error => {
        const message = error.error.message
        const alert_type = 'error'
        const title = 'Error'
        this.toasterComponent.openToast(message, alert_type, title)
      })
    }
  }
  ticketGroupModal($event) {
    this.commissionId = $event
    $('#ticketGroupContent').modal('show');
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  invalidCost
  isSubmit
  addTicketGroup() {
    this.calculatePricePerTicket();
    if (this.submit) {
      this.markFormGroupTouched(this.ticketGroupForm);
      this.dateValidationMessage = false
      this.invalidCost = false

      const starDate = moment(this.ticketGroupForm.value.from_date).format('YYYY-MM-DD');
      const endDate = moment(this.ticketGroupForm.value.to_date).format('YYYY-MM-DD');
      const startTime = this.ticketGroupForm.value.from_date.toString().split(' ')
      const endTime = this.ticketGroupForm.value.to_date.toString().split(' ')

      if (starDate > endDate) {
        this.dateValidationMessage = true
      }

      if (this.ticketGroupForm.valid && !this.dateValidationMessage && !this.invalidCost) {

        if (startTime[4] !== undefined) {

          this.ticketGroupForm.controls['from_time'].setValue(startTime[4].slice(0, -3));
        }
        if (endTime[4] !== undefined) {

          this.ticketGroupForm.controls['to_time'].setValue(endTime[4].slice(0, -3));
        }
        this.ticketGroupForm.value.from_date = starDate;
        this.ticketGroupForm.value.to_date = endDate;
        this.ticketGroupForm.value.foodeaze_event_id = this.eventId;
        this.ticketGroupForm.value.commission_id = this.commissionId;
        this.ticketGroupForm.value.ticket_type_id = this.ticketType;
        $('#ticketGroupContent').modal('hide');
        if (!this.isSubmit) {
          this.isSubmit = true
          this.foodTicketService.saveTicketGroup(this.ticketGroupForm.value).subscribe(data => {
            const message = 'Ticket group successfully added.'
            const alert_type = 'success'
            const title = 'Success'
            this.toasterComponent.openToast(message, alert_type, title)
            this.ticketGroupForm.controls['price_per_ticket'].setValue([''])
            this.ticketGroupForm.controls['name'].setValue([''])
            this.ticketGroupForm.controls['cost'].setValue([''])
            this.ticketGroupForm.controls['quantity'].setValue([''])
            this.ticketGroupForm.controls['limit'].setValue([''])
            this.ticketGroupForm.controls['to_date'].setValue(this.date)
            this.ticketGroupForm.controls['from_date'].setValue(this.date)
            this.foodTicketService.getTicket(this.eventId).subscribe(value => {
              if (value !== null) {
                this.foodTicketService.setAddEventStatus(value.data[0].show_add_to_event)
                value.data[0].fe_foodticket_commissions.forEach(element => {
                  if (element.foodticket_type_id === this.ticketType) {

                    this.foodTicketService.setTicketGroup(element)
                  }
                });
              }
            })
            this.isSubmit = false
          }, error => {
            const message = error.error.message
            const alert_type = 'error'
            const title = 'Error'
            this.toasterComponent.openToast(message, alert_type, title)
            this.isSubmit = false
          })
        }
      }
    }
  }
  calculatePricePerTicket() {
    const quantity = this.ticketGroupForm.controls['quantity'].value
    const cost = this.ticketGroupForm.controls['cost'].value
    if (quantity !== null && cost !== null) {
      this.ticketGroupForm.controls['price_per_ticket'].setValue(cost / quantity)
    }
  }

}
