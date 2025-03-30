import { Component, Input, ChangeDetectionStrategy, inject, effect } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-summary',
  styleUrls: ['pizza-summary.component.scss'],
  standalone: false,
  templateUrl: 'pizza-summary.component.html'
})
export class PizzaSummaryComponent {
  stateService = inject(StateService);

  pizzas: any = [];
  constructor() {
    effect(() => {
      this.pizzas = this.stateService.pizzas();
      console.log('Nueva lista de pizzas:', this.pizzas);
    });
  }
  
  
  
  customers!: any[];
}
