import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NetworkDetectionComponent } from './network-detection.component';

@NgModule({
  declarations: [
    NetworkDetectionComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NetworkDetectionComponent
  ]
})
export class NetworkDetectionModule { }
