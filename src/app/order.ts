import { Customer } from "./customer";
import { Service } from "./service";


export class Order{
    bookingOrderId: number;
    customer: Customer;
    orderDate: string;
	transactionMode:string;
	quantity: number;
	totalCost: number;
	planterQuantity: number;
	plantQuantity: number;
	seedQuantity: number;
	
	service: Service[];
    
}