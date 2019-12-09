import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
 roles:[];
 dropdownList: any = [];
 selectedItems = [];
 dropdownSettings = {};
 roless=[];
 multiDownList ={};
 multiDropDownSetting=[]
 multipleRole:any;
 title:any;
 description:any;
 assignDate:any;
 dueDate:any;
 id;
 isAsignTaskClicked = false;
  constructor(private router : Router, private formbuilder: FormBuilder, private globaleservice : EndpointsService, private toaster : ToastrService ) { }
 AddTask : FormGroup
  ngOnInit() {
    this.globaleservice.authorizeUser();
    this.globaleservice.getPromise('role/get-roles-for-attendence').then((res: any) => {
      
      this.dropdownList = res.data;
    })
  
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    

    this.multiDownList={
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }


    
  }
  addTask(){
    let payload = {
      title: this.title,
      description: this.description,
      assignDate: moment(this.assignDate).format('YYYY-MM-DD'),
      dueDate : moment(this.dueDate).format('YYYY-MM-DD'),
      userId: this.multipleRole.map(x=> x.id),
    }
    this.isAsignTaskClicked = true

      this.globaleservice.postPromise('task/assignTask',payload).then((res: any) => {
        if (res.code == 200) {
          this.isAsignTaskClicked = false;
          this.toaster.success('Task Added');
          this.title = '';
          this.description='';
          this.assignDate='';
          this.multipleRole=[];
          this.dueDate = '';
          this.roles= [];
          
          
        } else {
          this.toaster.error(res.message);
        }
      })
    
   
    
  }
  onItemSelect(item:any){
    this.multipleRole= []
    this.globaleservice.getPromise(`common/get-user-by-role/${item.id}/${this.globaleservice.getUserId}`).then((res :any)=>{
      
      this.multiDropDownSetting = res.data;
    })
    
   
}
OnItemDeSelect(item:any){
   
}
onSelectAll(items: any){
}
onDeSelectAll(items: any){
}
}
