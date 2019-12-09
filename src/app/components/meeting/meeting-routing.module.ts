import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingComponent } from './meeting.component';
import { ShowMeetingComponent } from './show-meeting/show-meeting.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'add-meeting',
        component:MeetingComponent,
        data :{
          title:'Add Meeting'
        },
        
      },
      {
        path:'show-meeting',
        component:ShowMeetingComponent,
        data:{
          title:'Show Meetings'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
