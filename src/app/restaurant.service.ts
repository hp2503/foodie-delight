import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant.interface';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = "https://example.mysite.com/restaurants"

  constructor(private http:HttpClient) { }

  getRestaurants(){
    return this.http.get(this.apiUrl);
  }
  getRestaurantById(id:number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addRestaurant(restaurant: Restaurant) {
    return this.http.post(this.apiUrl, restaurant);
  }

  updateRestaurant(id: number, restaurant: Restaurant){
    return this.http.put(`${this.apiUrl}/${id}`, restaurant);
  }

  deleteRestaurant(id?:  number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
