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
  pizzaEditingIndex = signal<any>(null)

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
      }),
      originalSelection: {
        size: this.sizeSelected(),
        toppings: this.toppingsSelected(),
        additions: this.additional()
      }
    }
    if(this.pizzaEditingIndex() !== null) {

      this.pizzas.update((pizzas) => {
        return pizzas.map((p, i) => i === this.pizzaEditingIndex() ? { ...p, ...pizza } : p);
      });
    }else {
      this.pizzas.update((pizzas) => [...pizzas, pizza]);
    }
    this.sizeSelected.set(null)
    this.toppingsSelected.set([])
    this.additional.set([]);
    this.pizzaEditingIndex.set(null);
  }

  editPizza(pizza: any, index: number) {
    this.pizzaEditingIndex.set(index);
    this.sizeSelected.set(pizza.originalSelection.size)
    this.toppingsSelected.set(pizza.originalSelection.toppings)
    this.additional.set(pizza.originalSelection.additions)
  }

  deletePizza(index: number) {
    this.pizzas().splice(index, 1);
  }
}
