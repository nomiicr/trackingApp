import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebMailComponent } from './web-mail.component';

const routes: Routes = [
  {
    path: '',
    children : [
      {
        path:'',
        component:WebMailComponent,
        data : {
          title : 'Web Mail'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebMailRoutingModule { }
