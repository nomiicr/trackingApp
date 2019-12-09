import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cleient-detail',
  templateUrl: './cleient-detail.component.html',
  styleUrls: ['./cleient-detail.component.scss']
})
export class CleientDetailComponent implements OnInit {
  saleMan;
  saleManId: [];
  id: any;
  users: [];
  companyName: any;
  companyId: any;
  companyWebsite: any;
  companyPersonDesignation: any
  companyAddress: any;
  companyPhone: any;
  comapanyFirstname: any;
  companyClientEmail: any;
  companyLastName: any;
  view: [];

  dateRange;
  constructor(private globalservice: EndpointsService, private toaster: ToastrService) { }

  ngOnInit() {
    this.globalservice.authorizeUser();
    this.globalservice.getPromise(`company/getAll/${this.globalservice.getUserId}`).then((res: any) => {
      this.saleManId = res.data

    })
  }
  
  onOptionsSelected(id) {

    this.id = id;
  }
 
  getList() {

    // if (!this.saleManId || !this.dateRange) {
    //   this.toaster.error('Please Select User and Date Range ')
    //   return
    // } else
    //   if (!this.saleManId) {
    //     this.toaster.error('Please Select User')
    //     return
    //   } else if (moment(this.dateRange[1]).format('YYYY-MM-DD') == 'Invalid date' || moment(this.dateRange[0]).format('YYYY-MM-DD') == 'Invalid date') {
    //     this.toaster.error('Select Date Range')
    //     return
    //   }
    let payload = {
     
      companyId: this.id
    }
    if(!this.id){
      this.toaster.error("Please Select Company")

    }else{
      this.globalservice.getPromiseParams(`client/companyClient`, payload).then((res: any) => {  
        debugger
         if(res.data.length < 0){
              this.toaster.info("No Data Found")
         }else{
  
           this.view = res.data
         }
  
      })
    }
   

  }

}
