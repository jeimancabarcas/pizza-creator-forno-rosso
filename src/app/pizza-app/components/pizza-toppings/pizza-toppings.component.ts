import { Component, inject } from '@angular/core';
import { StateService } from '../../state.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'pizza-toppings',
  styleUrls: ['pizza-toppings.component.scss'],
  standalone: false,
  template: `
   @if(this.stateService.toppingsSelected().length >= 6) {
    <div class="mb-3">
      <p-message size="small">¡Ya alcanzaste el máximo de ingredientes! Si quieres, puedes cambiar uno por otro. 🍕😋</p-message>
    </div>

   }
      <div class="grid grid-cols-4 gap-5">
        @for(topping of toppings; track $index) {
          
          <div (click)="selectTopping(topping)"
                [class.active]="verifyToppingSelected(topping)"
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
  stateService = inject(StateService)
  messageService = inject(MessageService)
  
  toppings = [
    { label: 'Anchoa', key: 'anchovy', selected: false },
    { label: 'Tocineta', key: 'bacon', selected: false },
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

  selectTopping(topping: any){
    if(!this.verifyToppingSelected(topping)) {
      if(this.stateService.toppingsSelected().length >= 6) {
        return;
      }
      this.stateService.toppingsSelected().push(topping)
    } else {
      this.stateService.toppingsSelected.set(this.stateService.toppingsSelected().filter(toppingSelected => toppingSelected.key !== topping.key))
    }
  }

  verifyToppingSelected(topping: any) {
    return this.stateService.toppingsSelected().find((value) => topping.key === value.key)
  }
}
