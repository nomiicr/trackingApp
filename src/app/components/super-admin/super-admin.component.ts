import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private global:EndpointsService,private toaster :ToastrService) { }
name;
isUserClicked = false;

  ngOnInit() {
   
  }
  addRole(){
    this.isUserClicked = true
  let payload ={
    name : this.name
  }
  this.global.postPromise(`role`,payload).then((res:any)=>{
      if(res.code== 200){
        this.isUserClicked = false;
        this.toaster.success("New Role Add")
      }else {
        this.toaster.error('Api Failed')
      }
  })


  }
}
