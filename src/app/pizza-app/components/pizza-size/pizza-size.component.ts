import { Component } from '@angular/core';
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
export class PizzaSizeComponent {
  sizeSelected: any = { type: 'large', inches: 40, label: 'Grande', slices: 10 };
  sizes: any[] = [
    { type: 'large', inches: 40, label: 'Grande', slices: 10 },
    { type: 'medium', inches: 33, label: 'Mediana', slices: 8 },
    { type: 'small', inches: 27, label: 'Small', slices: 6 },
    { type: 'personal', inches: 20, label: 'Pizzeta', slices: 4 },
  ];

  selectSize(sizeSelected: any) {
    this.sizeSelected = sizeSelected;
  }
}
