import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointsService } from '../../../shared/services/global.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register-with-image',
  templateUrl: './register-with-image.component.html',
  styleUrls: ['./register-with-image.component.scss']
})

export class RegisterWithImageComponent implements OnInit {
  apiUrl = environment.baseURl
  isSignUpClicked = false;
  constructor( private router: Router,
    private formbuilder: FormBuilder,
    private commonService : EndpointsService,
    private toaster : ToastrService) { }
    regForm: FormGroup
  @ViewChild('first',{static:false}) private elementref : ElementRef
  ngAfterViewInit(){
   this.elementref.nativeElement.focus();
 }
  ngOnInit() {
    this.commonService.authorizeUser()
    this.regForm = this.formbuilder.group({
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      email: new FormControl('', Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      password: new FormControl('', Validators.required),
      phone: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(11)])),
      address: new FormControl('',Validators.required),

    })
    
   }
  reg(){
    this.isSignUpClicked = true
    this.commonService.postPromise('admin/register',this.regForm.value).then((res :any) =>{
      if(res.code == 200){
        this.isSignUpClicked = false;
        this.toaster.success('Successfully Register');
        this.router.navigate(['/emailverification'])
      }else if(res.code == 403){
             this.isSignUpClicked = false;
             this.toaster.info(res.message);
      }
      
    })
  }
  
}
