import { Component } from '@angular/core';

@Component({
  selector: 'pizza-toppings',
  styleUrls: ['pizza-toppings.component.scss'],
  standalone: false,
  template: `
      <div class="grid grid-cols-4 gap-5">
        @for(topping of toppings; track $index) {
          
          <div (click)="topping.selected = !topping.selected"
                [class.active]="topping.selected"
                class="place-content-end place-content-center
                  rounded-xl p-2
                  cursor-pointer grayscale hover:grayscale-0 transition duration-200">
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
export class PizzaToppingsComponent {
  
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
}
