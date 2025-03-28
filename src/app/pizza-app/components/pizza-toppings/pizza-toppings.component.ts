import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true
};

@Component({
  selector: 'pizza-toppings',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  styleUrls: ['pizza-toppings.component.scss'],
  standalone: false,
  template: `
      <div class="grid grid-cols-4 gap-5">
        @for(topping of toppings; track $index) {
          
          <div (click)="topping.selected = !topping.selected"
                [class.active]="topping.selected"
                class="place-content-end place-content-center  cursor-pointer grayscale hover:grayscale-0 transition duration-200">
            <div class="flex justify-center">
              <img src="assets/toppings/{{topping.key}}.svg" width="30" height="30" alt="">
            </div>
            <span class="flex justify-center text-xs font-light">
              {{topping.label}}
            </span>
          </div>
        }
      </div>
  `
})
export class PizzaToppingsComponent implements ControlValueAccessor {
  
  toppings = [
    { label: 'Anchoa', key: 'anchovy', selected: true },
    { label: 'Tocineta', key: 'bacon', selected: true },
    { label: 'Basil', key: 'basil', selected: false },
    { label: 'Jalapeño', key: 'chili', selected: false },
    { label: 'Mozzarella', key: 'mozzarella', selected: false },
    { label: 'Champiñones', key: 'mushroom', selected: false },
    { label: 'Olive', key: 'olive', selected: false },
    { label: 'Cebolla', key: 'onion', selected: false },
    { label: 'Pimienton', key: 'pepper', selected: false },
    { label: 'Pepperoni', key: 'pepperoni', selected: false },
    { label: 'Maiz', key: 'sweetcorn', selected: false },
    { label: 'Tomate', key: 'tomato', selected: false }
  ];

  value: string[] = [];
  focused!: string;

  private onTouch!: Function;
  private onModelChange!: Function;

  registerOnChange(fn: any) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  writeValue(value: any) {
    this.value = value;
  }

  updateTopping(topping: string) {
    if (this.value.includes(topping)) {
      this.value = this.value.filter((x: string) => topping !== x);
    } else {
      this.value = this.value.concat([topping]);
    }
    this.onModelChange(this.value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
  }
}
