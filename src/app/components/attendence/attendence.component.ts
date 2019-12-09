import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
  roles: [];
  roleId;
  users: [];
  userId: any;
  view: any = [];
  dateRange: any;
  constructor(private global: EndpointsService, private toaster: ToastrService) { }

  ngOnInit() {
    this.global.authorizeUser();
    this.global.getPromise('role/get-roles-for-attendence').then((res: any) => {

      this.roles = res.data
    })
  }
  onOptionsSelected(id) {
    this.roleId = id;
    this.global.getPromise(`common/get-user-by-role/${id}/${this.global.getUserId}`).then((res: any) => {
      
      this.users = res.data
    })
  }
  ShowUsers() {
    if (!this.userId && !this.dateRange) {
      this.toaster.error('Please select user and date range. ')
    } else if (!this.dateRange) {
      this.toaster.error('Dates not selected ')
    } else if (moment(this.dateRange[1]).format('YYYY-MM-DD') == 'Invalid date' || moment(this.dateRange[0]).format('YYYY-MM-DD') == 'Invalid date') {
      this.toaster.error('Please select a date range.')

    } else if (!this.userId) {
      this.toaster.error('User not selected ')

    } else {
      let payLoad = {
        roleId: this.roleId,
        userId: this.userId ? this.userId.id : null,
        dateFrom: moment(this.dateRange[0]).format('YYYY-MM-DD'),
        dateTo: moment(this.dateRange[1]).format('YYYY-MM-DD'),
      }
      this.global.getPromiseParams(`attendance/getAttendance`, payLoad).then((res: any) => {
        
        if (res.data.length == 0) {
          this.toaster.error('No Data Found On This Dates')
        } else {
          this.view = res.data;


        }

      })

    }
  }

}
