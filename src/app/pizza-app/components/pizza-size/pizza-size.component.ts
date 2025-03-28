import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const PIZZA_SIZE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaSizeComponent),
  multi: true
};

@Component({
  selector: 'pizza-size',
  providers: [PIZZA_SIZE_ACCESSOR],
  styleUrls: ['pizza-size.component.scss'],
  standalone: false,
  template: `
  <div class="flex justify-between  w-full">
    @for(size of sizes; track size.type) {

    <div class="place-content-center" pTooltip="{{size.label}} ({{size.slices}} Porciones)" tooltipPosition="top" placeholder="Top">
      <div class="flex justify-center">
        
        <img
          src="assets/pizzas/{{size.type}}.png" 
          width="{{size.inches * 2}}" 
          alt="">
      </div>
      <div class="flex justify-center">
        <span class="text-sm font-normal">{{size.label}}</span>
      </div>
      <div class="flex justify-center">
        <span class="text-xs font-light">({{size.slices}} Porciones)</span>
      </div>
    </div>
    }
  </div>
    <!-- <div class="pizza-size section">
      <label *ngFor="let size of sizes; let i = index;"
          class="pizza-size__item"
          [class.pizza-size__item--active]="value === size.type"
          [class.pizza-size__item--focused]="focused === size.type">
        <input 
          type="radio"
          name="size"
          [attr.value]="size.type"
          (blur)="onBlur(size.type)"
          (change)="onChange(size.type)"
          (focus)="onFocus(size.type)"
          [checked]="value === size.type">

        <div class="pizza-size__plate">
          <div class="pizza-size__pizza pizza-size__pizza--{{ size.type }}">
            <div class="pizza-size__pizza__line"></div>
            <div class="pizza-size__pizza__line"></div>
            <div class="pizza-size__pizza__line"></div>
            <div class="pizza-size__pizza__line"></div>
          </div>
        </div>
        {{ size.type | titlecase }} ({{ size.inches }}")
      </label>
    </div> -->
  `
})
export class PizzaSizeComponent {
  sizes: any[] = [
    { type: 'large', inches: 40, label: 'Grande', slices: 10 },
    { type: 'medium', inches: 33, label: 'Mediana', slices: 8 },
    { type: 'small', inches: 27, label: 'Small', slices: 6 },
    { type: 'personal', inches: 20, label: 'Pizzeta', slices: 4 },
  ];
}
