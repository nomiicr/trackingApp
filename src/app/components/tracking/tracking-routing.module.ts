import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingComponent } from './tracking.component';

const routes: Routes = [
    {
      path:'',
      children:[
        {
          path: '',
          component:TrackingComponent,
          data :{
            title : 'Tracking'
          }
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
