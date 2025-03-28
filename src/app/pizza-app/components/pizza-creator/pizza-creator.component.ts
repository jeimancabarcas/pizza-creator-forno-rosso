import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-creator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-creator.component.scss'],
  standalone: false,
  template: `
    <div class="pizza-creator">

      <h2>
        Selecciona tus Pizzas
        <button class="button" type="button" (click)="addPizza()">
          <i class="fa fa-plus"></i>
          Agregar pizza
        </button>
      </h2>
      <p-accordion value="0">
        
        @for(pizza of pizzas.controls; track pizza.name; let i = $index) {
          <p-accordion-panel value="0">
              <p-accordion-header>
                <span class="flex justify-between items-center gap-2 w-full px-2">
                    <span class="font-bold whitespace-nowrap">
                      Pizza #{{i + 1}}
                    </span>

                    Eliminar
                </span>

              </p-accordion-header>
              <p-accordion-content>
                <div>
                  
                  <h3>Selecciona el tamaño <span class="required">*</span></h3>
                  <pizza-size>
                  </pizza-size>

                  <h3>Selecciona los ingredientes</h3>

                  <!-- <pizza-viewer
                    [pizzas]="pizzas"
                    [activePizza]="0">
                  </pizza-viewer> -->
                  <pizza-toppings >
                  </pizza-toppings>
                </div>
              </p-accordion-content>
          </p-accordion-panel>
        }
      </p-accordion>
    </div>
  `
})
export class PizzaCreatorComponent {
  stateService = inject(StateService)
  fb = inject(FormBuilder)
  private visiblePizza: number = 0;
  pizzas: any = this.stateService.form.get('pizzas');


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
