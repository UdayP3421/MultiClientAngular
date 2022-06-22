import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchant } from '../merchant';
import { Customer } from '../customer';
import { Service } from '../service';

import { Login } from '../login';
import { Adminlogin } from '../adminlogin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _baseUrl = "http://localhost:9090/admin";
  private _customerBaseUrl = "http://localhost:9090/admin/customer";
  


  username: string='';
  password:string='';

  set setUsername(valusername:string){
    this.username=valusername;
  }
  get getUsername():string{
    return this.username;
  }
  set setPassword(valpassword:string){
   this.password=valpassword;
 }
 get getPassword():string{
   return this.password;
 }

  //....................................Admin operations........................................
  constructor(private httpClient: HttpClient) { }
  getAdmin(username: string, password: string): Observable<Merchant> {
    return this.httpClient.get<Merchant>(`http://localhost:9090/merchant/login/${username}/${password}`);
  }

  logout(): Observable<String> {
    return this.httpClient.get<String>(`http://localhost:9090/merchant/logout`);
  }

  validateAdmin(username: string, password: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:9090/merchant/login/${username}/${password}`);
  }
  loginAdmin(login: Adminlogin): Observable<Object> {
    return this.httpClient.post("http://localhost:9090/merchant/login/", login , {responseType: 'text'});
  }

  getAdminUser(username: string): Observable<Merchant>
  {
     return this.httpClient.get<Merchant>(`http://localhost:9090/merchant/getadmin/${username}`);
  }

  //.....................................Customer Operations.....................................
  getCustomerList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>("http://localhost:9090/merchant/customer/")
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`http://localhost:9090/merchant/customer/${id}`);
  }

  getOrder(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`http://localhost:9090/merchant/orders/${id}`);
  }

  updateCustomer(id: number, customer: Customer): Observable<Object> {
    return this.httpClient.patch(`http://localhost:9090/merchant/customer/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<Object> {
    return this.httpClient.delete(`http://localhost:9090/merchant/customer/${id}`);
  }

  //...................................Service Operations.........................................
  getServiceList(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`http://localhost:9090/merchant/services/`);
  }

  createService(service: Service): Observable<Object> {
    return this.httpClient.post(`http://localhost:9090/merchant/service/`, service);
  }

  getServiceById(id: number): Observable<Service> {
    return this.httpClient.get<Service>(`http://localhost:9090/merchant/service/${id}`);
  }

  updateService(id: number, service: Service): Observable<Object> {
    return this.httpClient.put(`http://localhost:9090/merchant/service/${id}`, service);
  }

  deleteService(id: number): Observable<Object> {
    return this.httpClient.delete(`http://localhost:9090/merchant/service/${id}`);
  }

 


}
