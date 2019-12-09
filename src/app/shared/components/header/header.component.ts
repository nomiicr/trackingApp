
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { EndpointsService } from '../../services/global.service';

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public items: Menu[];
  public openNav: boolean = false
  public right_sidebar: boolean = false
  public text: string;
  userName :any;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService,
    private router : Router, private global : EndpointsService
    ) {  }
   

  ngOnInit() {
    this.global.authorizeUser();
this.userName = this.global.getUserName;
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems
    });
  }
openHorizontal(){
  this.openNav = !this.openNav
}
  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
 

}
