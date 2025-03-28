import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  fb = inject(FormBuilder)
  form!: FormGroup;
  activePizza = 0;
  total = 0;
  sizeSelected = signal({
      type: 'large', 
      inches: 40, 
      label: 'Grande', 
      slices: 10, 
      ingredientPrice: 5000,
      cheeseBorderPrice: 200,
      braisedPrice: 10000,
      additionCheese: 10000
  })

  prices: any = {
    small: { base: 9.99, toppings: 0.69 },
    medium: { base: 12.99, toppings: 0.99 },
    large: { base: 16.99, toppings: 1.29 }
  };


  constructor() { }

  
  createPizza() {
    return this.fb.group({
      size: ['small', Validators.required],
      toppings: [[]]
    });
  }
}
