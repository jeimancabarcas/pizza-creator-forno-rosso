import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, effect, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-creator',
  styleUrls: ['pizza-creator.component.scss'],
  standalone: false,
  template: `
    <div class="pizza-creator">
      <div class="flex items-center">
          <p-checkbox inputId="ingredient1" (onChange)="selectAdditional()" name="pizza" value="cheeseAddition" [(ngModel)]="additional" />
          <label for="ingredient1" class="ml-2"> Quiero una adicion de queso ({{additionCheese | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
      <div class="flex items-center">
          <p-checkbox inputId="ingredient2" (onChange)="selectAdditional()" name="pizza" value="cheeseBorder" [(ngModel)]="additional" />
          <label for="ingredient2" class="ml-2"> Quiero borde de queso ({{cheeseBorderPrice | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
      <div class="flex items-center">
          <p-checkbox inputId="ingredient3" (onChange)="selectAdditional()" name="pizza" value="braised" [(ngModel)]="additional" />
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

  constructor(public stateService: StateService) {
    this.pizzas = this.stateService.form.get('pizzas');
    this.cheeseBorderPrice = this.stateService.sizeSelected().cheeseBorderPrice
    this.additionCheese = this.stateService.sizeSelected().additionCheese
    this.braisedPrice = this.stateService.sizeSelected().braisedPrice
    this.additional = this.stateService.additional;
    effect(() => {
      this.cheeseBorderPrice = this.stateService.sizeSelected().cheeseBorderPrice
    });
  }

  selectAdditional() {
    this.stateService.additional = this.additional;
    console.log(this.additional)
  }
}
