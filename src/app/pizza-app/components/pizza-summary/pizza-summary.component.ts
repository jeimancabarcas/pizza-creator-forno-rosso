import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-summary.component.scss'],
  standalone: false,
  templateUrl: 'pizza-summary.component.html'
})
export class PizzaSummaryComponent {
  stateService = inject(StateService);
  parent: FormGroup = this.stateService.form;
  total: number = this.stateService.total;
  prices: any = this.stateService.prices;

  
  customers!: any[];
}
