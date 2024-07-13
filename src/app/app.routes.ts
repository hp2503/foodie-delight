import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component : HomeComponent },    
    { path: 'restaurants', component : RestaurantListComponent},
    { path: 'restaurant-details', component : RestaurantDetailsComponent},
    { path: '**', redirectTo: '/home' }
];
