import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { ViewRoleComponent } from './view-role/view-role.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'createrole',
      component: SuperAdminComponent,
      data: {
        title: "Create Role"
      }
    },
    {
      path: 'viewrole',
      component: ViewRoleComponent,
      data: {
        title: "View Role"
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
