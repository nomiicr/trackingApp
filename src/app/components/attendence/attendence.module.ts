import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AttendenceRoutingModule } from './attendence-routing.module';
import { AttendenceComponent } from './attendence.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AttendenceComponent],
  imports: [
    CommonModule,
    FormsModule,
    AttendenceRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ]
})
export class AttendenceModule { }
