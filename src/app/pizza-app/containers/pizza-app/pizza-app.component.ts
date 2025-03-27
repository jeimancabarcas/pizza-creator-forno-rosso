import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PizzaValidators } from '../../validators/pizza.validator';
import { PizzaFormComponent } from '../../components/pizza-form/pizza-form.component';
import { StateService } from '../../state.service';

@Component({
  selector: 'pizza-app',
  styleUrls: ['pizza-app.component.scss'],
  standalone: false,
  templateUrl: 'pizza-app.component.html'
})
export class PizzaAppComponent implements OnInit {
  private stateService = inject(StateService)

  constructor() {
    
    this.stateService.form = this.stateService.fb.group({
      details: this.stateService.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        whatsappPhone: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(3)]],
      }),
      pizzas: this.stateService.fb.array([
        this.stateService.createPizza()
      ])
    });

  }

  ngOnInit() {
    this.calculateTotal(this.stateService.form.get('pizzas')?.value);
    this.stateService.form.get('pizzas')?.valueChanges
      .subscribe(value => this.calculateTotal(value));
  }



  calculateTotal(value: any) {
    const price = value.reduce((prev: number, next: any) => {
      const price = this.stateService.prices[next.size];
      return prev + price.base + (price.toppings * next.toppings.length);
    }, 0);
    this.stateService.total = price.toFixed(2);
  }


}
