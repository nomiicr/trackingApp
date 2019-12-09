import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SidebarModule } from 'ng-sidebar';

import { CleientDetailRoutingModule } from './cleient-detail-routing.module';
import { CleientDetailComponent } from './cleient-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './add-client/add-client.component';
import {MatSidenavModule, MatDrawer} from '@angular/material/sidenav';

@NgModule({
  declarations: [CleientDetailComponent, AddClientComponent],
  imports: [
    CommonModule,
    CleientDetailRoutingModule,
    FormsModule,
    SidebarModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    MatSidenavModule,
  
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ]
})
export class CleientDetailModule { }
