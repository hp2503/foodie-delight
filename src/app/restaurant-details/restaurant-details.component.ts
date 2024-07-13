import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { LoaderComponent } from '../loader/loader.component';
import { Restaurant } from '../restaurant.interface';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantDetails: FormGroup;
  restaurantEdit: boolean = false;
  editId: number | null = null;
  loader: boolean =false;

  // Validation patterns
  namePattern: string = "^[a-zA-Z'\\-\\s]+$";
  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  phonePattern: string = "^(\\+\\d{1,3}[- ]?)?\\d{8,}$";

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.restaurantDetails = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      caterers_name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      if (data['editRestaurant'] && data['id']) {
        this.loader = true;
        this.editId = +data['id'];
        this.restaurantEdit = true;
        this.restaurantService.getRestaurantById(this.editId).subscribe((data:Restaurant|any)=>{
          const restaurantData = data;
          this.fillFormData(restaurantData);
          this.loader = false;
        }, error =>{
          console.warn(error);
          const sampleRestaurantData = {
            name : "Hardik ka dhaba",
            description : "Special Cuisine",
            address : "MHC , Sector 13, chandigarh",
            caterers_name: "Hardik",
            phone : "+91-7888954253",
            email : "hardikprashar25@gmail.com"
          }
          this.fillFormData(sampleRestaurantData);
          this.loader = false;
        })
      }
    });
  }

  fillFormData(restaurant:Restaurant){
    this.restaurantDetails.patchValue({
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      caterers_name: restaurant.caterers_name,
      phone: restaurant.phone,
      email: restaurant.email
    });
  }

  onSubmit() {
    if (this.restaurantDetails.valid) {
      if (this.restaurantEdit) {
        this.editRestaurant(this.editId);
      } else {
        this.submitRestaurantForm();
      }
    }
  }

  submitRestaurantForm() {
    if (this.restaurantDetails.valid) {
      this.loader = true;
      this.restaurantService.addRestaurant(this.restaurantDetails.value).subscribe(() => {
        this.loader = false;
        this.router.navigate(['/restaurants']);
      }, error => {
        this.loader = false;
        console.warn(error);
      });
    }
  }

  editRestaurant(id?: number | null) {
    if (this.restaurantDetails.valid && id) {
      this.loader = true;
      this.restaurantService.updateRestaurant(id, this.restaurantDetails.value).subscribe(() => {
        this.loader = false;
        this.router.navigate(['/restaurants']);
      }, error => {
        this.loader = false;
        console.warn(error);
      });
    }
  }
}
