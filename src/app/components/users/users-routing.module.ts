import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path : '',
    children : [
      {
        path : 'add-user',
        component:UsersComponent,
        data : {
          title : 'Add-Users'
        },
        
      },{
        path:'user-list',
        component: UserListComponent,
        data : {
          title : 'user-list'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
