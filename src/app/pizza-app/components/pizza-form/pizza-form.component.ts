import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-form',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-form.component.scss'],
  templateUrl: 'pizza-form.component.html'
})
export class PizzaFormComponent {
  form: FormGroup;
  
  constructor(private stateService: StateService) {
    this.form = this.stateService.form;
  }

  onSubmit(event: any) {
    console.log(this.form.value)
    alert('Order placed')
  }

}
