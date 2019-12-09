import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebMailRoutingModule } from './web-mail-routing.module';
import { WebMailComponent } from './web-mail.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [WebMailComponent],
  imports: [
    CommonModule,
    WebMailRoutingModule,
    CKEditorModule,
    NgbModule
    
  ]
})
export class WebMailModule { }
