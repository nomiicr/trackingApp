import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
users:[];
  constructor(private service : EndpointsService) { }

  ngOnInit() {
    debugger
    this.service.getPromise(`company/getAll/${this.service.getUserId}`).then((res :any)=>{
      this.users =res.data;
    })
  }

}
