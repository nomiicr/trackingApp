import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { AddCompanyComponent } from './add-company/add-company.component';

const routes: Routes = [
  {
    path: '',
    children : [{
      path: 'addcompany',
      component : AddCompanyComponent,
      data : {
        title: 'Company'
      },
    },
  {
    path: 'showcompany',
    component:CompanyComponent,
    data : {
      tite : "Show Company"
    }
  }]

    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
