import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendenceComponent } from './attendence.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:AttendenceComponent,
        data : {
          title:'Attendence'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendenceRoutingModule { }
