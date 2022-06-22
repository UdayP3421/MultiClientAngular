import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from './service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getServices(): Observable<Service[]>{
    return this.http.get<Service[]>(`http://localhost:9090/api/service/getservices/`);
  }

 
}
