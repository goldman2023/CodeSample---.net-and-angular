import { ToasterComponent } from './../shared/toaster';
import { LoginService } from './../pages/auth/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  changePassword
  email
  reset_token
  path
  constructor(private route: ActivatedRoute, private toasterComponent: ToasterComponent,
    private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.path = this.route.snapshot.routeConfig.path
    if (this.route.snapshot.routeConfig.path === 'change-password') {
      this.changePassword = true
    }
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.reset_token = params['reset_token'];
    });
  }
  ngAfterViewInit() {
    document.getElementById('preloader').classList.add('hide');
  }
  save(form) {
    if (form.valid) {
      if (this.route.snapshot.routeConfig.path === 'change-password') {
        this.loginService.change_password(form.value).subscribe(data => {
          const message = data.message

          const alert_type = 'success'
          const title = 'Success'
          this.toasterComponent.openToast(message, alert_type, title)
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
        }, error => {
          const message = error.error.message
          const alert_type = 'error'
          const title = 'Error'
          this.toasterComponent.openToast(message, alert_type, title)
        })
      } else {
        form.value.email = this.email
        form.value.reset_code = this.reset_token
        this.loginService.reset_password(form.value).subscribe(data => {

          const message = data.message

          const alert_type = 'success'
          const title = 'Success'
          this.toasterComponent.openToast(message, alert_type, title)
          localStorage.removeItem('token')
          this.router.navigate(['/login'])
        }, error => {
          const message = error.error.message
          const alert_type = 'error'
          const title = 'Error'
          this.toasterComponent.openToast(message, alert_type, title)
        })
      }
    }
  }
}
