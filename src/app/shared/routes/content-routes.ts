import { Routes } from '@angular/router';

export const content: Routes = [
  // {
  //   path: 'sample',
  //   loadChildren: './components/sample/sample.module#SampleModule'
  // },
  {
    path:"superadmin",
    loadChildren:'./components/super-admin/super-admin.module#SuperAdminModule'
  },
  {
    path : 'users',
    loadChildren :'./components/users/users.module#UsersModule',
   
  },
  {
    path : 'webmail',
    loadChildren :'./components/web-mail/web-mail.module#WebMailModule',
   
  },
  {
    path : 'company',
    loadChildren :'./components/company/company.module#CompanyModule',
   
  },
  {
    path : 'client',
    loadChildren :'./components/cleient-detail/cleient-detail.module#CleientDetailModule',
   
  },
   {
     path:'task',
     loadChildren : './components/task/task.module#TaskModule'
   },
   {
     path:'meeting',
     loadChildren:'./components/meeting/meeting.module#MeetingModule'
   },
   {
    path:'tracking',
    loadChildren:'./components/tracking/tracking.module#TrackingModule',
  },
  {
    path:'attendence',
    loadChildren:'./components/attendence/attendence.module#AttendenceModule'
  }

];