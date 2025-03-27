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
        Choose your pizzas
        <button class="button" type="button" (click)="addPizza()">
          <i class="fa fa-plus"></i>
          Add pizza
        </button>
      </h2>
      
      <div *ngFor="let pizza of pizzas.controls; let i = index;">
        <div class="pizza-creator__header" (click)="togglePizza(i)">
          
          <i 
            class="fa fa-fw pizza-creator__icon"
            [class.fa-chevron-down]="openPizza !== i"
            [class.fa-chevron-up]="openPizza === i"></i>
          Pizza {{ i + 1 }}

          <i 
            class="fa fa-fw pizza-creator__status"
            [class.fa-check]="pizza.valid"
            [class.fa-times]="pizza.invalid"></i>

          <div 
            class="pizza-creator__delete"
            *ngIf="pizzas.controls.length > 1"
            (click)="removePizza(i)">
            <i class="fa fa-trash fa-fw"></i>
          </div>

        </div>

        <div 
          class="pizza-creator__content"
          [class.pizza-creator__content--open]="openPizza === i"
          [formGroup]="pizza">

          <h3>Select the size <span class="required">*</span></h3>
          <pizza-size 
            formControlName="size">
          </pizza-size>

          <h3>Pick your toppings</h3>
          
          <pizza-viewer
            [pizzas]="pizzas"
            [activePizza]="0">
          </pizza-viewer>
          <pizza-toppings 
            formControlName="toppings">
          </pizza-toppings>

        </div>

      </div>
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
