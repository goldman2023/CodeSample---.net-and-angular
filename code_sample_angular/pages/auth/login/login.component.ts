import { ToasterComponent } from './../../../shared/toaster';
import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements AfterViewInit {
    public router: Router;
    forgotPassword = false
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    invalid_credentials: boolean;
    constructor(private loginService: LoginService, router: Router, fb: FormBuilder, private toasterComponent: ToasterComponent) {
        this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }
    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.loginService.login(this.form.value).subscribe(data => {
                localStorage.setItem('token', data.data.token.access_token);
                this.loginService.isOrganizer().subscribe( resp => {
                    if (resp.data.is_organizer === true) {
                        this.router.navigate(['/events/organizer_event']);
                    } else {
                        this.router.navigate(['/dashboard']);
                    }
                })
            }, error => {
                this.invalid_credentials = error.error.message
            })
        }
    }
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
    forgot_password(form) {
        if (form.valid) {
            this.loginService.forgot_password(form.value).subscribe(data => {
                this.forgotPassword = false
                const message = data.message
                const alert_type = 'success'
                const title = 'Success'
                this.toasterComponent.openToast(message, alert_type, title)
            }, error => {
                this.invalid_credentials = error.error.message
            })
        }
    }
}
