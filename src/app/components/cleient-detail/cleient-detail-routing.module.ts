import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CleientDetailComponent } from './cleient-detail.component';
import { AddClientComponent } from './add-client/add-client.component';

const routes: Routes = [
 {
   path : '',
   children : [
      {
        path : 'clientdetail',
        component: CleientDetailComponent,
        data : {
          title : 'Client Detail'
        }
      },
      {
        path: 'addcompany', 
        component : AddClientComponent,
        data : {
          title : "Add Client"
        }
      }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleientDetailRoutingModule { }
