import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/address';
import { Observable } from 'rxjs';

import { Order } from './order';
import { Login } from './login';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _baseUrl = 'http://localhost:9090/customer';
  loggedCustomer = {} as Customer;

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

  constructor(private _http: HttpClient) { }



  getCustomer(username: string, password: string): Observable<any> {
    return this._http.get<Customer>(`http://localhost:9090/customer/logincu/${username}/${password}`,{responseType:"json"});
  }
  validateCustomer(username: string, password: string): Observable<boolean> {
    console.log(username, password);
    return this._http.get<boolean>(`http://localhost:9090/customer/login/${username}/${password}`);
  }
  loginCustomer(login: Login): Observable<Object> {
    return this._http.post("http://localhost:9090/customer/login/", login,{responseType: 'text'});
  }
  getCustomerUser(username: string): Observable<Customer>
  {
     return this._http.get<Customer>(`http://localhost:9090/customer/getcustomer/${username}`);
  }

  getOrders(): Observable<Customer> {
    return this._http.get<Customer>(`http://localhost:9090/customer/orders`);
  }

  getLastOrder(): Observable<Order> {
    return this._http.get<Order>(`http://localhost:9090/customer/lastOrder`);
  }

  addCustomer(customer: Customer): Observable<Object> {
    return this._http.post("http://localhost:9090/customer/customer/", customer);
  }

  updateAddress(address: Address): Observable<Address> {
    return this._http.put<Address>(`http://localhost:9090/customer/address`, address);
  }

  updatePassword(customer: Customer): Observable<Customer> {
    return this._http.put<Customer>(`http://localhost:9090/customer/updatecustomer`, customer);
  }

  logout(): Observable<String> {
    return this._http.get<String>(`http://localhost:9090/customer/logout`);
  }

  deleteCustomer(): Observable<any> {
    return this._http.delete(`http://localhost:9090/customer/deletecustomer`, { responseType: 'text' });
  }
}
