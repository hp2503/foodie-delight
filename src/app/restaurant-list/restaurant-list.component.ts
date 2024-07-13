import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant.interface';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
})
export class RestaurantListComponent implements OnInit {
  loader: boolean = false;
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void{
    this.loader = true;
    this.restaurantService.getRestaurants().subscribe(
      (data : Restaurant[]|any) => {
        this.loader = false;
        this.restaurants = data;
      },
      (error) => {
        this.loader = false;
        this.restaurants = this.generateSampleData();
        console.warn(error);
      }
    );
  }

  generateSampleData():Restaurant[]{
    const sampleData: Restaurant[] = [];
    const imageUrl = 'https://d2sz1kgdtrlf1n.cloudfront.net/task_images/MwXy1676279943517-Store2x.png';
    const descriptions = [
      'this specialises in italian cuisine and offer affordable rates of items',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    ];
    for (let i = 1; i <= 15; i++) {
      const restaurant = {
        id: i,
        image_url: imageUrl,
        name: 'Restaurant ' + i,
        caterers_name: 'Caterers ' + i,
        address: 'Address ' + i,
        phone: '1234567890', // Example phone number
        email: `restaurant${i}@example.com`,
        description: descriptions[i % descriptions.length]
      };
      sampleData.push(restaurant);
    }
    return sampleData;
  }

  deleteRestaurant(id?: number) {
    this.loader = true;
    this.restaurantService.deleteRestaurant(id).subscribe(
      () => {
        this.loader = false;
        this.restaurants = this.restaurants.filter((res: any) => res?.id != id);
      },
      (error) => {
        this.loader = false;
        console.warn(error);
      }
    );
  }

  editRestaurant(id?: number) {
    this.router.navigate([`/restaurant-details`], {
      queryParams: { editRestaurant: 1, id: id },
    });
  }
}
