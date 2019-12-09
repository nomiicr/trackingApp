import { Component, OnInit, TemplateRef } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import * as moment from 'moment/moment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-show-meeting',
  templateUrl: './show-meeting.component.html',
  styleUrls: ['./show-meeting.component.scss']
})
export class ShowMeetingComponent implements OnInit {
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
  modalRef: BsModalRef;
  showMeeting : [];
  constructor(private http: HttpClient,private globalservice: EndpointsService, private modalService: BsModalService, private toaster: ToastrService) { }

  ngOnInit() {
    this.globalservice.authorizeUser();
    this.globalservice.getPromise(`salesman/${this.globalservice.getUserId}`).then((res: any) => {

      this.saleManId = res.data

    })
  }
  onOptionsSelected(id) {

    this.id = id;
  }
  openModal(template: TemplateRef<any>, client) {
    this.companyName = client.companyName
    this.companyAddress = client.address
    this.companyWebsite = client.companyWebsite
    this.companyPhone = client.phone
    this.comapanyFirstname = client.firstName
    this.companyLastName = client.lastName
    this.companyPersonDesignation = client.designation
    this.companyClientEmail = client.email

    this.modalRef = this.modalService.show(template);
  }
  getList() {

    if (!this.saleManId || !this.dateRange) {
      this.toaster.error('Please Select User and Date Range ')
      return
    } else
      if (!this.saleManId) {
        this.toaster.error('Please Select User')
        return
      } else if (moment(this.dateRange[1]).format('YYYY-MM-DD') == 'Invalid date' || moment(this.dateRange[0]).format('YYYY-MM-DD') == 'Invalid date') {
        this.toaster.error('Select Date Range')
        return
      }
    let payload = {
      dateTo: moment(this.dateRange[1]).format('YYYY-MM-DD'),
      dateFrom: moment(this.dateRange[0]).format('YYYY-MM-DD'),
      saleManIds: this.id
    }
    this.globalservice.getPromiseParams(`meeting`, payload).then((res: any) => {
let show = [];
      this.view = res.data
      show = res.data.map(async (val,ind)=>{
      let location = await this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${val.tracking.latitude},${val.tracking.longitude}&key=AIzaSyAohZ7btYPVl4_ABdRmMOO7t2Jo9cQF7s4`).toPromise()
debugger
      })

    })    

  }
}
