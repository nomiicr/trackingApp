import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
users:[];
  constructor(private service : EndpointsService,
    private formbuilder : FormBuilder,
    private toaster : ToastrService) { }
    AddClientForm : FormGroup;
    isAsignTaskClicked:boolean = false;

  ngOnInit() {
    this.service.getPromise(`company/getAll/${this.service.getUserId}`).then((res : any)=>{
      debugger
      this.users = res.data;
    })
    let re = /^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{10}$/
    this.AddClientForm= this.formbuilder.group({
      firstName : new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      companyId: new FormControl('',Validators.required),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      phone : new FormControl('', Validators.compose([Validators.required, Validators.pattern(re)])),
      designation : new FormControl('',Validators.required),
      adminId : this.service.getUserId
    })
    
  }
  addUser(){
    this.isAsignTaskClicked = true;
    this.service.postPromise('client',this.AddClientForm.value).then((res:any)=>{
      if(res.code == 200){
        this.isAsignTaskClicked = false;
           this.toaster.success("Clientt Created")
      }
    })
    
  }


}
;
