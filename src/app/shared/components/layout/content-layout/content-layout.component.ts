import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import * as feather from 'feather-icons';
import { CustomizerService } from '../../../services/customizer.service';
import { EndpointsService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit, AfterViewInit {
  
  constructor(public navServices: NavService, public customizer: CustomizerService, private global : EndpointsService) {  
   
   }

  ngOnInit() {
    debugger
  
    this.global.authorizeUser();
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }


}
