import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EndpointsService } from 'src/app/shared/services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  
  isLoginClicked = false;
  constructor(private router : Router, private formbuilder: FormBuilder, private globaleservice : EndpointsService, private toaster : ToastrService ) { }
  apiUrl = environment.baseURl
  @ViewChild('enterEmail',{static : false}) private elementRef : ElementRef
  ngAfterViewInit(){

    this.elementRef.nativeElement.focus();
  }
  ngOnInit() { 
    this.globaleservice.authorizeUser();
    this.loginForm = this.formbuilder.group({
      email : new FormControl('',Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      password : new FormControl('',Validators.required)
    })
  }
  private setLoggedIn(value: boolean): void {
    this.globaleservice.setLoggedIn(value);
  }
  login(){
    this.isLoginClicked = true
    this.globaleservice.postPromise('admin/login',this.loginForm.value).then((res : any) =>{
      debugger
      if(res.code == 200){
        this.setLoggedIn(true);
        this.globaleservice.setUserToken = res.token;
        this.toaster.show('Successfully Login');
        this.router.navigate([''])
        

      }else if(res.code == 403){
      this.isLoginClicked = false
        this.toaster.error(res.message);
      } else{
        this.isLoginClicked = false 
        this.toaster.error('Kindly Check Email and Password !!')
      }
    })

  }
}
