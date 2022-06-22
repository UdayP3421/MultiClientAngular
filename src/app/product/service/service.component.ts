import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Service } from 'src/app/service';
import { PlantService } from 'src/app/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services!: Service[];
  constructor(private plantService: PlantService,
    private cartService: CartService) { }


  ngOnInit(): void {
    this.getServices()
  }

  public getServices(): void {
    this.plantService.getServices().subscribe(
      (response: Service[]) => {
        this.services = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };
  addServiceToCart(service: Service) {
    this.cartService.addServiceToCart(service);
    // window.alert('added');
  }

}
