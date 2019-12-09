import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
roles : [];
roleId: any = "";
  constructor(private global : EndpointsService, private toaster : ToastrService) { }

  ngOnInit() {
    this.global.authorizeUser();
    this.global.getPromise('role/get-roles-for-attendence').then((res: any) => {
      
      this.roles = res.data
    })
   
  }

  data = [];

  settings = {
    mode : 'inline',
    actions: {
  add:false ,
 delete: false  
    },
    edit:{
      confirmSave: true
    },
    columns: {
      
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      },
      phone:{
        title : "Phone"
      },
      address : {
        title : "Adress"
      } 
    }
  };
  onOptionsSelected(id){
  this.roleId = id;
  }
  ShowUsers(){
    if(this.roleId == ""){
      this.toaster.info("Please select any role")
      return
    }
    this.global.getPromise(`common/get-user-by-role/${this.roleId}/${this.global.getUserId}`).then((res :any)=>{
      if(res.data.length == 0){
        this.toaster.info('No Record Found')
        return
      }
      
      this.data = res.data;
    })
  }
  onSaveConfirm($event){
    
   
       let obj = {
          firstName : $event.newData.firstName,
          lastName : $event.newData.lastName,
          phone : $event.newData.phone,
          address : $event.newData.address,
          email : $event.newData.email

     }
    this.global.editPromise(`common/updateUser/${$event.newData.id}`,obj).then((res : any)=>{
      
      $event.confirm.resolve($event.newData)
    })
  }
}
