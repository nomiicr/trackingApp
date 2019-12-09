import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
 roles : any= [];
 roleId ;
 isUserClicked = false;
 submitted = false;



  constructor(private router : Router, private formbuilder: FormBuilder, private globaleservice : EndpointsService, private toaster : ToastrService ) { }
  AddUserForm : FormGroup
  ngOnInit() {
    this.globaleservice.authorizeUser();

    this.globaleservice.getPromise('role/get-roles-for-attendence').then((res: any) => {
      
      this.roles = res.data
    })

  
  
    let re = /^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{11}$/

    this.AddUserForm = this.formbuilder.group({
      firstName : new FormControl('',Validators.required),
      lastName : new FormControl('',Validators.required),
     
      email : new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      address : new FormControl('',Validators.required),
      phone: new FormControl('',Validators.compose([Validators.required,Validators.pattern(re)])),
      roleId: new FormControl('',Validators.required),
      adminId : this.globaleservice.getUserId
    })
  }
get f(){  return  this.AddUserForm.controls}
  addUser(){
     this.isUserClicked = true;
    this.globaleservice.postPromise('common/createUser',this.AddUserForm.value).then((res : any)=>{
      if(res.code == 500){
        this.isUserClicked = false;
       this.toaster.info(res.message);

      }else
      if(res.code == 200){
        this.isUserClicked = false;
        this.toaster.success('Add User Successfully!!')
        this.AddUserForm.reset();
      }else if(res.code == 403){
        this.isUserClicked = false;
        this.toaster.info(res.message)
      }
    })

  }
 
  
}
