import { Component, Input, ChangeDetectionStrategy, inject, effect, output } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-summary',
  styleUrls: ['pizza-summary.component.scss'],
  standalone: false,
  templateUrl: 'pizza-summary.component.html'
})
export class PizzaSummaryComponent {
  stateService = inject(StateService);
  editPizza = output<any>();

  pizzas: any = [];
  constructor() {
    effect(() => {
      this.pizzas = this.stateService.pizzas();
      console.log('Nueva lista de pizzas:', this.pizzas);
    });
  }

  getTotalPizza(pizza: any) {
    const totalToppings = pizza.toppings.reduce((suma: any, value: any) => suma + value.price, 0);
    const totalAdditions = pizza.additions.reduce((suma: any, value: any) => suma + value.price, 0);
    return totalAdditions + totalToppings + pizza.size.price
  }

  getTotal() {
    let total = 0;
    this.pizzas?.forEach((pizza: any) => {
      total += this.getTotalPizza(pizza);
    });
    return total;
  }

  openEditPizza(pizza: any, index: number) {
    this.stateService.editPizza(pizza, index)
    this.editPizza.emit(pizza)
  }

  deletePizza(index: number) {
    this.stateService.deletePizza(index)
  }
}
