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
  <div class="grid grid-cols-2 gap-4 w-full">
    @for(size of sizes; track size.type) {

      <p-card [header]="size.label">
      </p-card>
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
    { type: 'large', inches: 40, label: 'Grande' },
    { type: 'medium', inches: 33, label: 'Mediana' },
    { type: 'small', inches: 27, label: 'Small' },
    { type: 'personal', inches: 20, label: 'Pizzeta' },
  ];
}
