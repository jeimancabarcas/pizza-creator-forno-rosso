import { Component, effect, inject, OnInit } from '@angular/core';
import { StateService } from '../../state.service';
@Component({
  selector: 'pizza-size',
  styleUrls: ['pizza-size.component.scss'],
  standalone: false,
  template: `
  <div class="flex justify-between  w-full">
    @for(size of sizes; track size.type; let i = $index) {
    <div class="place-content-center" pTooltip="{{size.label}} ({{size.slices}} Porciones)" tooltipPosition="top" placeholder="Top" (click)="selectSize(size)">
      <div class="flex justify-center">
        <img
          src="assets/pizzas/{{size.type}}.png" 
          width="{{size.inches * 2}}" 
          [class.active]="size.type === sizeSelected.type"
          class="grayscale hover:grayscale-0 transition duration-200 cursor-pointer"
          alt="">
      </div>
      <div class="flex justify-center md:hidden">
        <span class="text-sm font-normal">{{size.label}}</span>
      </div>
      <div class="flex justify-center md:hidden">
        <span class="text-xs font-light">({{size.slices}} Porciones)</span>
      </div>
    </div>
    }
  </div>
  `
})
export class PizzaSizeComponent implements OnInit{

  sizes: any[]
  
  ngOnInit(): void {
    if(this.stateService.pizzaEditingIndex() === null) {
      this.selectSize(this.sizes[0])
    }
  }

  sizeSelected: any;
  constructor(private stateService: StateService) {
    effect(() => {
      if(!this.stateService.sizeSelected()) {
        this.selectSize(this.sizes[0])
      } else {
        this.selectSize(this.stateService.sizeSelected())
      }
    });
    this.sizes = [
      { 
        type: 'large', 
        inches: 40, 
        label: 'Grande', 
        slices: 10, 
        ingredientPrice: 5000,
        cheeseBorderPrice: 12000,
        braisedPrice: 10000,
        additionCheese: 10000,
        price: 20000
      },
      { 
        type: 'medium', 
        inches: 33, 
        label: 'Mediana', 
        slices: 8, 
        ingredientPrice: 4000,
        cheeseBorderPrice: 8000,
        braisedPrice: 10000,
        additionCheese: 10000,
        price: 15000
      },
      { 
        type: 'small', 
        inches: 27, 
        label: 'Small', 
        slices: 6, 
        ingredientPrice: 3000,
        cheeseBorderPrice: 6000,
        braisedPrice: 10000,
        additionCheese: 10000,
        price: 12000
      },
      { type: 'personal', 
        inches: 20, 
        label: 'Pizzeta', 
        slices: 4, 
        ingredientPrice: 2000,
        cheeseBorderPrice: 5000,
        braisedPrice: 10000,
        additionCheese: 10000,
        price: 10000
      },
    ];
  }

  selectSize(sizeSelected: any) {
    this.sizeSelected = sizeSelected;
    this.stateService.sizeSelected.set(sizeSelected);
  }
}
