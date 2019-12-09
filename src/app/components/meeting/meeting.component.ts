import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  roles:[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  roless=[];
  salesManList:[];
  multiDownList ={};
  multiDropDownSetting=[]
  multipleRole:any;
  title:any;
  description:any;
  assignDate:any;
  dueDate:any;
  id;
  clientList:[];
  salesId:any;
  date:any;
  clientId:any;
  mytime: Date = new Date();
  constructor(private router : Router, private formbuilder: FormBuilder, private globaleservice : EndpointsService, private toaster : ToastrService ) { }

  ngOnInit() {
    this.globaleservice.getPromise(`salesman/${this.globaleservice.getUserId}`).then((res : any)=>{
      
      this.salesManList = res.data
    })
    this.globaleservice.getPromise(`client/${this.globaleservice.getUserId}`).then((res : any)=>{
      
      this.clientList = res.data
    })
 
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    

    this.multiDownList={
      singleSelection: true,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }
  addMeeting(){
    let payload = {
      title : this.title,
      description:this.description,
      date: moment(this.date).format('YYYY-MM-DD'),
      time :moment(this.mytime).format('HH:mm'),
      clientId:this.clientId[0].id,
      salesManId:this.salesId[0].id
    }
    this.globaleservice.postPromise('meeting', payload).then((res: any) => {
      if (res.code == 200) {
        this.toaster.success(res.message);
      
      } else {
        this.toaster.error(res.message);
      }
    })
    
  }
}
