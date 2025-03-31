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

  visible: boolean = false;

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
  }

  savePizza() {
    this.stateService.addPizza()
  }
  showDialog() {
    this.visible = true;
  }

  editPizza(pizza: any) {
    this.showDialog();
    console.log("PIZZA", pizza)
  }
}
