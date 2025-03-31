import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  fb = inject(FormBuilder)
  form!: FormGroup;
  sizeSelected = signal<any>(null)
  toppingsSelected = signal<any[]>([])
  additional = signal<any[]>([]);
  pizzas = signal<any[]>([]);

  constructor() { }

  
  createPizza() {
    return this.fb.group({
      size: ['small', Validators.required],
      toppings: [[]]
    });
  }

  addPizza() {
    const pizza = {
      size: this.sizeSelected(),
      toppings: this.toppingsSelected().map(topping => ({
        ...topping,
        price: this.sizeSelected() ? this.sizeSelected()?.ingredientPrice : 0
      })),
      additions: this.additional().map((addition: any) => {
        if(addition.key === 'cheeseBorder'){
          addition.price = this.sizeSelected().cheeseBorderPrice
        } else if(addition.key === 'additionCheese') {
          addition.price = this.sizeSelected().additionCheese
        } else if(addition.key === 'braised') {
          addition.price = this.sizeSelected().braisedPrice
        }
        return addition
      })
    }
    this.pizzas.update((pizzas) => [...pizzas, pizza]);
    this.sizeSelected.set(null)
    this.toppingsSelected.set([])
    this.additional.set([]);
    console.log(this.pizzas())
  }
}
