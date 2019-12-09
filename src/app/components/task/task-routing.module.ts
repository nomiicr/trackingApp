import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';
import { ShowTaskComponent } from './show-task/show-task.component';

const routes: Routes = [
    {
      path:'',
      children : [
        {
          path:'assigntask',
          component:TaskComponent,
          data : {
            title:'Assign-task'
          },
        
        },
        {
          path:'showtask',
          component:ShowTaskComponent,
          data:{
            title:'Show Task'
          }
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
