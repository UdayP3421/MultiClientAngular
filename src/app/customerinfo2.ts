import { Address } from "./address";
import { Order } from "./order";
export class Customerinfo {

    customerId: number;
    customerName: string;
    customerEmail: string;
    username: string;
    password: string;
    address: Address;
    orders: Order[]; 
}

