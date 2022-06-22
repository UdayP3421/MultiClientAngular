import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Merchant } from '../merchant';
import { Customer } from '../customer';
import { Service } from '../service';


import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /*...........................Hiding variables......................................*/
  isCustomer: boolean = false;
 
  isService: boolean = false;

  ifAddService: boolean = false;

  admin = {} as Merchant;
  customers: Customer[] = [];
  serviceList: Service[] = [];


  public username: string = '';
  public password: string = '';
  constructor(private _adminservice: AdminService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.username = this._route.snapshot.params['username'];
    this.password = this._route.snapshot.params['password'];
    this._adminservice.getAdminUser(this._adminservice.getUsername).subscribe(data => { this.admin = data });
  }

  log_out: String = '';
  logout() {
    this._adminservice.logout().subscribe(next => { this.log_out = next; console.log(this.log_out); },
      error => this._router.navigate(['/customer']))
  }

  

  /*.......................................Customer operations....................................*/
  customerObj = {} as Customer;
  isOrder: boolean = false;
  customer() {
    if (this.isCustomer == false) {
      this.isCustomer = true;
      this.isService = false;
    
      this._adminservice.getCustomerList().subscribe(data => {
        this.customers = data;
        console.log(data);
      });
    }
    else {
      this.isCustomer = false;
    }
  }
  deleteCustomer(id: number) {
    this._adminservice.deleteCustomer(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }

  viewOrder(id: number) {
    if (this.isOrder == false) {
      this._adminservice.getOrder(id).subscribe(data => {
        this.customerObj = data;
        this.isOrder = true;
        console.log(data)
      }
        , error => console.log(error));
    } else {
      this.isOrder = false;
    }
  }
  /*.....................................Plant Operations.............................................*/
  isButton: boolean = false;
  plant() {
    if (this.isService == false) {
      this.isService = true;
      this.isCustomer = false;
      
      this._adminservice.getServiceList().subscribe(data => { this.serviceList = data; console.log(data); })
    }
    else {
      this.isService = false;
    }
  }
  serviceFormView() {
    if (this.ifAddService == false) {
      this.ifAddService = true;
      this.serviceForm.reset();
    } else {
      this.ifAddService = false;
    }
  }
  clearService() {
    this.serviceForm.reset();
  }

  serviceForm = new FormGroup({
    plant1: new FormControl(''), plant2: new FormControl(''), plant3: new FormControl(''), plant4: new FormControl(''),
     plant11: new FormControl('')
  });

  serviceObj = {} as Service;
  addService() {
    
    this.serviceObj.serviceName = this.serviceForm.controls.plant1.value;
    this.serviceObj.serviceType = this.serviceForm.controls.plant2.value;
    this.serviceObj.serviceDescription = this.serviceForm.controls.plant3.value;
    this.serviceObj.servicePrice = this.serviceForm.controls.plant11.value;
  

    this._adminservice.createService(this.serviceObj)
      .subscribe(data => { console.log(this.serviceObj); },
        error => console.log(error));

  }
  check: boolean = true;
  serviceNewObj = {} as Service;
  plant21: number = 0;
  plant22: number = 0;
  updateService(id: number) {
    this._adminservice.getServiceById(id).subscribe(data => { this.serviceNewObj = data }, error => console.log(error));
   
    this.serviceNewObj.servicePrice = this.plant22;
    this._adminservice.updateService(id, this.serviceNewObj).subscribe(data => {
      console.log(data);
    
    }
      , error => console.log(error));

  }
  deleteService(id: number) {
    this._adminservice.deleteService(id).subscribe(data => {
      console.log(data);
     
    });
  }
}



