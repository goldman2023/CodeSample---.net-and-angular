import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing.module';
import { SharedModule } from './../../shared/shared.module';

import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';

import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [SharedModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    LoginService
  ],
  declarations: [LoginComponent]
})

export class AuthModule { }
