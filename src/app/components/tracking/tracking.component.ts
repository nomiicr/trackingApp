import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { EndpointsService } from 'src/app/shared/services/global.service';
import * as moment from 'moment/moment';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent implements OnInit {
  roles: [];
  roleId;
  users: [];
  userId: any;
  view: any = [];
  date: any;
  location: any = "";
  respData = []
  markerTitle = ""
  markerDesc = ""
  isSearchedClicked = false
  type = ""
  audi = 'please select'
  selected = "please Select user"
  constructor(private global: EndpointsService, private http: HttpClient, private toaster: ToastrService) { }
  // Map1


  //Map2
  public lat_m2: number = 24.8939333;
  public lng_m2: number = 67.0657381;
  public zoom_m2: number = 10;


  public markers = []
  ngOnInit() {
    this.global.authorizeUser();
    this.global.getPromise(`rider/${this.global.getUserId}`).then((res: any) => {
      debugger
      this.users = res.data
    })
  
    var soceketLocation = io.connect(environment.socketUrl);
    soceketLocation.on('track_user', (data) => {
      if (this.isSearchedClicked) {
        let length = this.markers.length
        this.markers.push({
          lat: data.data.latitude,
          lng: data.data.longitude,
          index: length,
          isCheckedOut: 0
        })
        this.respData.push({
          taskId: null,
          meetingId: null,
        })
      }

    })
  
  }
  onOptionsSelected(id) {
    this.roleId = id;
    this.global.getPromise(`common/get-user-by-role/${id}/${this.global.getUserId}`).then((res: any) => {
      debugger
      this.users = res.data
    })
  }
  getTrack() {
    if (!this.userId) {
      this.toaster.error('Please select any user')
      return
    } else if (!this.date) {
      this.toaster.error('Please select date')
      return
    }
    let payload = {
      userId: this.userId.id,
      date: moment(this.date).format('YYYY-MM-DD'),

    }


    this.global.viewEmployeeTrack(payload, this.global.getAccessToken()).subscribe((res: any) => {
      if (res.data.length == 0) {
        this.toaster.info('! No Data Found')
      } else {
        this.respData = res.data
        this.markers = res.data.map((el, ind) => {
          debugger
          let latlong = { lat: "", lng: "", label: "", index: "", isCheckedOut: 0 };
          latlong.lat = el.latitude;
          latlong.lng = el.longitude;
          latlong.index = ind
          latlong.isCheckedOut = res.isCheckedOut

          return latlong
        })
      }

    })
  }

  getLocationOnMarker(m) {
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${m.lat},${m.lng}&key=AIzaSyAohZ7btYPVl4_ABdRmMOO7t2Jo9cQF7s4`).toPromise().then((res: any) => {
      this.location = res.results[0].formatted_address;
    })

    let resObj = this.respData[m.index]

    if (m.index == 0) {
      this.type = "Attendance"
      this.markerTitle = "Checked In."
      this.markerDesc = ""

    } else if (resObj.taskId != null) {
      this.type = "Task"
      this.markerTitle = resObj.task.title
      this.markerDesc = resObj.task.description
    } else if (resObj.meetingId != null) {
      this.type = "Meeting"
      this.markerTitle = resObj.meeting.title
      this.markerDesc = resObj.meeting.description
    } else if (m.index == (this.respData.length - 1) && m.isCheckedOut == 0) {
      this.type = "On Route"
      this.markerTitle = "Transit"
      this.markerDesc = ""

    } else if (m.index == (this.respData.length - 1)) {
      this.type = "Attendance"
      this.markerTitle = "Checked Out."
      this.markerDesc = ""

    } else {
      this.type = "On Route"
      this.markerTitle = "Transit"
      this.markerDesc = ""

    }

  }
}


interface LatLngLiteral {
  lat: number;
  lng: number;
}