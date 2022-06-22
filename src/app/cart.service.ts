import { Injectable } from '@angular/core';
import { Order } from './order';
import { OrderService } from './order.service';
import { OrderComponent } from './order/order.component';
import { Service } from './service';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  serviceItems: Service[] = [];
 

  
  serviceSum: number = 1;


 
  serviceTotal: number = 1;
  
  totalPrice: number = 1;


  serviceItemQuantity: number = 1;
 

  order = {} as Order;

  constructor(private orderService: OrderService) { }


 


  /*.......Plant............... */
  addServiceToCart(service: Service) {
    this.serviceItems.push(service);
  }
  getServiceItems() {
    return this.serviceItems;
  }




  /*.......Common Operations............... */
  clearCart() {
  
    this.serviceItems = [];
   

    this.getServiceItems();
   
  }

  /*.......Order Operations............... */

  onClickCheckout(order: Order): void {

   

    if (order.service.length != 0) { this.order.plantQuantity = order.plantQuantity }
    else { this.order.plantQuantity = 0 }

  

    this.order.totalCost = order.totalCost;
   
   
  
    this.order.service = order.service;
    console.log("cart Service" + this.order.plantQuantity);
    this.orderService.setOrder(this.order);
  }

}
