import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  fullname;
  email;
  website;
  phone;
  type;
  address;
  isAsignTaskClicked: boolean;
  constructor( private service : EndpointsService, private toaster : ToastrService) { }

  ngOnInit() {
  }
  addCompany(){
    let payload = {
      name : this.fullname,
      email : this.email,
      address : this.address,
      phone : this.phone,
      type : this.type,
      website : this.website,
      adminId : this.service.getUserId
    }
    this.service.postPromise('company',payload).then((res : any)=>{
      debugger
      this.toaster.success('add')
    })
  }
}
