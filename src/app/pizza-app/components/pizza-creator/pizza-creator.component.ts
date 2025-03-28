import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-creator',
  styleUrls: ['pizza-creator.component.scss'],
  standalone: false,
  template: `
    <div class="pizza-creator">
      <div class="flex items-center">
          <p-checkbox inputId="ingredient1" name="pizza"value="Cheese" [(ngModel)]="additional" />
          <label for="ingredient1" class="ml-2"> Quiero una adicion de queso ({{additionCheese | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
      <div class="flex items-center">
          <p-checkbox inputId="ingredient2" name="pizza" value="Mushroom" [(ngModel)]="additional" />
          <label for="ingredient2" class="ml-2"> Quiero borde de queso ({{cheeseBorderPrice | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
      <div class="flex items-center">
          <p-checkbox inputId="ingredient3" name="pizza" value="Pepper" [(ngModel)]="additional" />
          <label for="ingredient3" class="ml-2"> Quiero que mi pizza sea estofada  ({{braisedPrice | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
    </div>
  `
})
export class PizzaCreatorComponent {
  fb = inject(FormBuilder)
  private visiblePizza: number = 0;
  pizzas: any;
  additional: any;
  cheeseBorderPrice: number;
  braisedPrice: number;
  additionCheese: number;

  constructor(private stateService: StateService) {
    this.pizzas = this.stateService.form.get('pizzas');
    this.cheeseBorderPrice = this.stateService.sizeSelected().cheeseBorderPrice
    this.additionCheese = this.stateService.sizeSelected().additionCheese
    this.braisedPrice = this.stateService.sizeSelected().braisedPrice
    effect(() => {
      this.cheeseBorderPrice = this.stateService.sizeSelected().cheeseBorderPrice
    });
  }
  get openPizza() {
    return this.visiblePizza;
  }

  set openPizza(index: number) {
    this.visiblePizza = index;
  }
  addPizza() {
    const control = this.stateService.form.get('pizzas') as FormArray;
    control.push(this.stateService.createPizza());
  }

  removePizza(index: number) {
    const control = this.stateService.form.get('pizzas') as FormArray;
    control.removeAt(index);
  }

  togglePizza(index: number) {
    this.stateService.activePizza = index;
  }
  
}
