import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPwdComponent implements OnInit {
  email : any;
  isSendClick = false;
  constructor(private global : EndpointsService, private toaster : ToastrService) { }
@ViewChild('recoverEmail',{static : false}) private elementref : ElementRef
ngAfterViewInit(){
  this.elementref.nativeElement.focus();
} 
ngOnInit() { }
  reset(){
    let payload = {
      email : this.email
    }
    debugger
    this.global.postPromise(`admin/forgetpassword`,payload).then((res : any)=>{
       if(res.code == 200) {
           this.isSendClick = true;
       }else if(res.code == 404){
  this.toaster.error('Email Not Found')
       }





    })
  }
}
