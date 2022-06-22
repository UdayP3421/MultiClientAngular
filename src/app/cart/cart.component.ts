import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Order } from '../order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  serviceSum: number;
 


  serviceTotal: number
 
  totalPrice: number

  
  serviceItems = this.cartService.getServiceItems();
  


  serviceItemQuantity: number = 1;


  order = {} as Order;
  constructor(private cartService: CartService) {
  
    if (this.serviceItems.length != 0)
      this.serviceSum = this.serviceItems[0].servicePrice;
    else
      this.serviceSum = 0;

   
    this.serviceTotal = this.serviceSum * this.serviceItems.length;
 
    this.totalPrice = this.serviceTotal;
  }
  ngOnInit() {


  }

 
  
  updateServiceSum(event): void {
    if (this.serviceItems.length != 0) {
      this.serviceSum = this.serviceItems
        .map(x => x.servicePrice)
        .reduce((a, b) => {
          return a + b;
        });
    }
    else
      this.serviceSum = 0

    this.serviceItemQuantity = event;
    this.serviceTotal = this.serviceSum * this.serviceItemQuantity;
    this.updateTotalPrice();
  }
 
  updateTotalPrice(): void {
    this.totalPrice =  this.serviceTotal ;

  }

  onClickCheckout(): void {
    console.log("cart compo" + this.serviceItemQuantity);
    this.order.plantQuantity = this.serviceItemQuantity;
  
    this.order.totalCost = this.totalPrice;
    this.order.service = this.serviceItems;
   
    this.order.quantity = this.order.seedQuantity; //changed
    this.cartService.onClickCheckout(this.order);
  }


}
