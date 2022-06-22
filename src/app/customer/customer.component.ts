import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Merchant } from '../merchant';
import { AdminService } from '../admin/admin.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Login } from '../login';
import { Adminlogin } from '../adminlogin';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customerUsername = '';
  public customerPassword = '';
  public customer={} as Customer;
  public login ={} as Login;
  /////////////ADMIN////////////////////
  public adminUsername = '';
  public adminPassword = '';
  public admin = {} as Merchant;
  public adminl={} as Adminlogin;


  public isShown: boolean = false;
  constructor(private _customerservice: CustomerService,
    private _adminservice: AdminService, private _router: Router, private http : HttpClient) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    adminUsername: new FormControl(''),
    adminPassword: new FormControl(''),
  });

/*   onSubmit() {
    this.customerUsername = this.loginForm.controls.username.value;
    this.customerPassword = this.loginForm.controls.password.value;
    console.log(this.customerUsername);
    console.log(this.customer);
    this._customerservice.validateCustomer(this.customerUsername, this.customerPassword).subscribe(
      data => {this._router.navigate(['/home', this.customerUsername,this.customerPassword],{skipLocationChange: true}) }
    )
    }
 */
    onLogin() {
      this.login.userName = this.loginForm.controls.username.value;
      this.login.password = this.loginForm.controls.password.value;
      this._customerservice.setUsername=this.login.userName;
      this._customerservice.setPassword=this.login.password;

      this._customerservice.loginCustomer(this.login).subscribe(
        
      data => {console.log(this.customer.customerEmail),this._router.navigate(['/home', this.customerUsername,this.customerPassword],{skipLocationChange: true}) }
     
      )
      let user:string = this.login.userName;
     }
     
  
/*     onLogin(){
      this.http.get<any>("http://localhost:9090/customer/getallcusrtomer")
      .subscribe(res=>{
       const user = res.find((a:any)=>{
              return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
       });
       if(user){
         alert("Login success");
         this.loginForm.reset();
         this._router.navigate(['/home'])
       }else{
         alert("user not found");
       }
     
      })
    } */

  ///////////////////////ADMIN//////////////////////////////
/*   isAdminShown: boolean = false;
  onAdminSubmit() {
    this.adminUsername = this.loginForm.controls.username.value;
    this.adminPassword = this.loginForm.controls.password.value;

    this._adminservice.validateAdmin(this.adminUsername, this.adminPassword).subscribe(
      data => { this._router.navigate(['/admin-home/', this.adminUsername, this.adminPassword]) }
      , error => this.isAdminShown = true);
  }
 */

  onAdminLogin() {
    this.adminl.adminUsername = this.loginForm.controls.username.value;
    this.adminl.adminPassword = this.loginForm.controls.password.value;
    this._adminservice.setUsername=this.adminl.adminUsername;
    this._adminservice.setPassword=this.adminl.adminPassword;

   
    this._adminservice.loginAdmin(this.adminl).subscribe(
      data => {this._router.navigate(['/admin-home', this.adminUsername,this.adminPassword],{skipLocationChange: true})}
    )
    }

  ///////////////////////ADMIN//////////////////////////////

}
