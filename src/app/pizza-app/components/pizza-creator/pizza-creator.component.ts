import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, effect, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-creator',
  styleUrls: ['pizza-creator.component.scss'],
  standalone: false,
  template: `
    <div class="pizza-creator">
      <div class="flex items-center">
          <p-checkbox inputId="ingredient1" (onChange)="selectAdditional()" name="pizza" [value]="additionCheeseValue" [(ngModel)]="additional" />
          <label for="ingredient1" class="ml-2 text-sm font-normal"> Quiero una adicion de queso ({{additionCheeseValue.price | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
      <div class="flex items-center">
          <p-checkbox inputId="ingredient2" (onChange)="selectAdditional()" name="pizza" [value]="cheeseBorderValue" [(ngModel)]="additional" />
          <label for="ingredient2" class="ml-2 text-sm font-normal"> Quiero borde de queso ({{cheeseBorderValue.price | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
      <div class="flex items-center">
          <p-checkbox inputId="ingredient3" (onChange)="selectAdditional()" name="pizza" [value]="braisedPriceValue" [(ngModel)]="additional" />
          <label for="ingredient3" class="ml-2 text-sm font-normal"> Quiero que mi pizza sea estofada  ({{braisedPriceValue.price | currency:'USD':'symbol':'1.0-0'}})</label>
      </div>
    </div>
  `
})
export class PizzaCreatorComponent {
  fb = inject(FormBuilder)
  pizzas: any;
  additional: any;

  cheeseBorderValue: any = {
    key: 'cheeseBorder',
    value: 'Borde de queso',
    price: 0
  };
  braisedPriceValue: any = {
    key: 'braised',
    value: 'Estofada',
    price: 0
  };
  additionCheeseValue: any = {
    key: 'additionCheese',
    value: 'Adicion de queso',
    price: 0
  };

  constructor(public stateService: StateService) {
    this.pizzas = this.stateService.form.get('pizzas');
    console.log(this.additional)
    this.cheeseBorderValue.price = this.stateService.sizeSelected()?.cheeseBorderPrice
    this.braisedPriceValue.price = this.stateService.sizeSelected()?.additionCheese
    this.additionCheeseValue.price = this.stateService.sizeSelected()?.braisedPrice
    effect(() => {
      this.additional = this.stateService.additional()
      this.cheeseBorderValue.price = this.stateService.sizeSelected()?.cheeseBorderPrice
      this.braisedPriceValue.price = this.stateService.sizeSelected()?.additionCheese
      this.additionCheeseValue.price = this.stateService.sizeSelected()?.braisedPrice
    });
  }

  selectAdditional() {
    this.stateService.additional.set(this.additional);
    console.log(this.additional)
  }
}
