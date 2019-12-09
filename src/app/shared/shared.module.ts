import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// services
import { NavService } from "./services/nav.service";

// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { EndpointsService } from './services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TaskModule } from '../components/task/task.module';
import { MeetingModule } from '../components/meeting/meeting.module';
import { TrackingModule } from '../components/tracking/tracking.module';
import { AttendenceModule } from '../components/attendence/attendence.module';
import { AuthenticationModule } from '../pages/authentication/authentication.module';
import { WebMailModule } from '../components/web-mail/web-mail.module';
import { CompanyModule } from '../components/company/company.module';
import { SuperAdminModule } from '../components/super-admin/super-admin.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentLayoutComponent,
    FeatherIconsComponent,
    BreadcrumbComponent,
    ToggleFullscreenDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    TaskModule,
    TrackingModule,
    AttendenceModule,
    AuthenticationModule,
    SuperAdminModule,
    MeetingModule,
    ReactiveFormsModule,
    WebMailModule,
    CompanyModule,
    ToastrModule.forRoot()
  ],
  exports: [
    FeatherIconsComponent,
  ],
  providers: [
    NavService,
    EndpointsService
  ]
})
export class SharedModule { }

