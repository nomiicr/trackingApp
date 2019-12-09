import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [TrackingComponent],
  imports: [
    CommonModule,
    FormsModule,
    TrackingRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAohZ7btYPVl4_ABdRmMOO7t2Jo9cQF7s4'
    }),
  ]
})
export class TrackingModule { }
