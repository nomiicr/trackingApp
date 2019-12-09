import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from "./shared/routes/content-routes";
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterWithImageComponent } from './pages/authentication/register-with-image/register-with-image.component';
import { RegisterWithVideoComponent } from './pages/authentication/register-with-video/register-with-video.component';
import { ForgetPwdComponent } from './pages/authentication/forget-pwd/forget-pwd.component';
import { EmailVerficationComponent } from './pages/authentication/email-verfication/email-verfication.component';

const routes: Routes = [
  {
    path: 'login',

   component :LoginComponent
  },
  {
     path : 'register',
     component:RegisterWithImageComponent
  },
  {
    path : 'forgotpassword',
    component:ForgetPwdComponent
 },
 {
  path : 'emailverification',
  component : EmailVerficationComponent
 },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  // {
  //   path: '**',
  //   redirectTo: '/users/add-users'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
