import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterComponent } from './../../../shared/toaster';
import { StripeService } from 'ngx-stripe';
import { MapsAPILoader } from '@agm/core';
import { BillingInfoService } from './billing-info.service';
declare var google;

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BillingInfoComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  form: FormGroup;
  private acc_token: any;
  private bank_token: any;
  connected: any;
  submitted: any;
  submit: any;
  constructor(
    private fb: FormBuilder, private stripeService: StripeService,
    private mapsAPILoader: MapsAPILoader,
    private billingInfoService: BillingInfoService,
    private toasterComponent: ToasterComponent,
    private ngZone: NgZone,
    ) {
      this.connected = 0;
      this.submitted = true;
    }
  ngOnInit(): void {
    this.getLocation();
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      ssn_last_4: ['', Validators.required],
      personal_id_number: ['', Validators.required],
      phone_number: ['', Validators.required],
      dob: ['', Validators.required],
      location: [],
      routing_number: ['', Validators.required],
      account_number: ['', Validators.required],
      location_name: ['', Validators.required]
    })
    this.billingInfoService.isConnected().subscribe(data => {
      if (data.status === 200) {
        this.connected = data.data.connected;
        this.billingInfoService.retrieveAccount().subscribe(response => {
          if (response.status === 200) {
            const year: any = '' + response.data.legal_entity.dob.year;
            let month: any = '' + response.data.legal_entity.dob.month;
            let day: any = '' + response.data.legal_entity.dob.day;
            if (month.length < 2) {
              month = '0' + month;
            }
            if (day.length < 2) {
              day = '0' + day;
            }
            const addr = response.data.legal_entity.personal_address;
            this.form.controls['first_name'].setValue(response.data.legal_entity.first_name);
            this.form.controls['last_name'].setValue(response.data.legal_entity.last_name);
            this.form.controls['dob'].setValue([year, month, day].join('-'));
            this.form.controls['routing_number'].setValue(response.data.external_accounts.data[0].routing_number);
            this.form.controls['phone_number'].setValue(response.data.legal_entity.phone_number);
            this.form.controls['location_name'].setValue(addr.line1 + ', ' + addr.city + ', ' +
              addr.postal_code + ' ' + addr.state + ', USA');
          }
        })
      }
    });
  }
  getYearMonthDay(date: any) {
    const dateObj = date.split('-');
    return (dateObj)
  }
  getLineCityStatePostal(address: any) {
    const addr = address.split(',');
    const postalObj = addr[2].split(' ');
    addr[0] = addr[0].trim();
    addr[1] = addr[1].trim();
    addr[2] = postalObj[1].trim();
    addr[3] = postalObj[2].trim();
    return (addr)
  }
  getLocation() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address'], componentRestrictions: { country: 'us' }
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.form.controls['location_name'].setValue(place.formatted_address);
          this.form.controls['location'].setValue(this.latitude + ',' + this.longitude);
        });
      });
    });
  }

  createToken(): void {
    if (this.submit) {
      this.markFormGroupTouched(this.form);
    }
    if (this.form.valid ) {
      const dob = this.getYearMonthDay(this.form.get('dob').value);
      const formatted_address = this.form.get('location_name').value;
      if (formatted_address.search(',') >= 3) {
        this.submitted = false;
        const adress = this.getLineCityStatePostal(formatted_address);
        const params_account = {
          individual: {
            first_name: this.form.get('first_name').value,
            last_name: this.form.get('last_name').value,
            ssn_last_4: this.form.get('ssn_last_4').value,
            id_number: this.form.get('personal_id_number').value,
            phone: this.form.get('phone_number').value,
            address: {
              city: adress[1],
              line1: adress[0],
              postal_code: adress[3],
              state: adress[2]
            },
            dob: {
              day: dob[2],
              month: dob[1],
              year: dob[0]
            }
          },
          tos_shown_and_accepted: true,
        };
        const params_bank = {
          country: 'US',
          currency: 'usd',
          account_holder_name: this.form.get('first_name').value + ' ' + this.form.get('last_name').value,
          account_holder_type: 'individual',
          routing_number: this.form.get('routing_number').value,
          account_number: this.form.get('account_number').value,
        }
        this.stripeService.
          createToken('account', params_account)
          .subscribe((result) => {
            if (result.token) {
              this.acc_token = result.token.id;
            } else if (result.error) {
              const message = result.error.message;
              const alert_type = 'error'
              const title = 'Error'
              this.toasterComponent.openToast(message, alert_type, title)
            }
          });
        this.stripeService.
          createToken('bank_account', params_bank)
          .subscribe((result) => {
            if (result.token) {
              this.bank_token = result.token.id;
              const param = {
                acctoken : this.acc_token,
                banktoken : result.token.id
              };
              this.billingInfoService.createAccount(param).subscribe((response) => {
                if (response.status === 200) {
                  this.connected = 1;
                  const message = 'Success!'
                  const alert_type = 'success'
                  const title = 'Success'
                  this.toasterComponent.openToast(message, alert_type, title)
                }
              }, err => {
                const message = err.error.message
                const alert_type = 'error'
                const title = 'Error'
                this.toasterComponent.openToast(message, alert_type, title)
              });
            } else if (result.error) {
              const message = result.error.message;
              const alert_type = 'error'
              const title = 'Error'
              this.toasterComponent.openToast(message, alert_type, title)
            }
          });
          this.submitted = true;
      } else {
        const message = 'Location Name is invalid. Search and select location!';
        const alert_type = 'error'
        const title = 'Error'
        this.toasterComponent.openToast(message, alert_type, title)
      }
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
