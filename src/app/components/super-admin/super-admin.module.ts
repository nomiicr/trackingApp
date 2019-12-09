import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { ViewRoleComponent } from './view-role/view-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    
import { UiSwitchModule } from 'ngx-toggle-switch';
    


@NgModule({
  declarations: [SuperAdminComponent, ViewRoleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuperAdminRoutingModule,
    UiSwitchModule
    
    
  ]
})
export class SuperAdminModule { }
