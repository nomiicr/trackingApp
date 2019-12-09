import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {
  user: any = [] ;
  constructor(private global : EndpointsService, private toaster : ToastrService) {

   }

  ngOnInit() {
    debugger
    this.global.getPromise('admin/getAllAdmin').then((res:any)=>{
     if(res.code == 200){

       this.user = res.data
     }else {
      this.toaster.error("Check Internet Connection")
     }
    })
  }
  onChange(isAl,id){
    console.log(id);
   let obj = {
    isAllow : isAl == 0? false : true 
   }
   this.global.editPromise(`admin/allowAdmin/${id}`,obj).then((res : any)=>{
     
   })
    
    

  }
}
