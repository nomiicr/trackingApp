import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { EndpointsService } from './shared/services/global.service';
import { Router } from '@angular/router';
import * as JWT from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'endless-starterkit';
  constructor(private global : EndpointsService , private router : Router){}
ngOnInit(){
  debugger
  var soceketLocation = io.connect(environment.socketUrl);
  soceketLocation.on('isAllowed',(data)=>{
    debugger
    let token = localStorage.getItem('token')
    let userid = JWT(token).adminResult.id
    console.log(userid);
    
    if(data.isAllow == false && data.id == userid){
      localStorage.clear();
      this.router.navigate(['login'])
    }

    console.log(data);
  })
}
}
