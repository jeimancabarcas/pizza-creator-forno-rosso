import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pizza-form',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-form.component.scss'],
  template: `<form (ngSubmit)="onSubmit($event)" [formGroup]="parent">
  <div >
    <div class="border-b border-gray-900/10 pb-3">
      <h2 class="text-base/7 font-semibold text-gray-900">Digita tu información</h2>
      <p class="mt-1 text-sm/6 text-gray-600">Esta información sera usada para registrar tu pedido</p>
      <div class="mt-4 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6" formGroupName="details">
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Nombre</label>
          <div class="mt-2">
            <input formControlName="name" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Apellido</label>
          <div class="mt-2">
            <input formControlName="lastName" type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>
        
        <div class="sm:col-span-3">
          <label for="first-name" class="block text-sm/6 font-medium text-gray-900">Numero de Whatsapp</label>
          <div class="mt-2">
            <input formControlName="whatsappPhone" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div class="sm:col-span-3">
          <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Numero de contacto</label>
          <div class="mt-2">
            <input formControlName="phone" type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div class="col-span-full">
          <label for="street-address" class="block text-sm/6 font-medium text-gray-900">Dirección</label>
          <div class="mt-2">
            <input formControlName="address" type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-2 flex items-center justify-end gap-x-6">
    <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
  </div>
      <pizza-creator 
        [pizzas]="parent.get('pizzas')"
        (add)="onAddPizza($event)"
        (remove)="onRemovePizza($event)"
        (toggle)="onToggle($event)">
      </pizza-creator>

      <pizza-summary 
        [parent]="parent"
        [prices]="prices"
        [total]="total">
      </pizza-summary>
</form>
  `
})
export class PizzaFormComponent {
  
  @Input()
  parent!: FormGroup;

  @Input()
  total!: string;

  @Input()
  prices: any;

  @Output()
  add = new EventEmitter<any>();

  @Output()
  remove = new EventEmitter<any>();

  @Output()
  toggle = new EventEmitter<number>();

  @Output()
  submit = new EventEmitter<any>();

  onAddPizza(event: any) {
    this.add.emit(event);
  }

  onRemovePizza(event: any) {
    this.remove.emit(event);
  }

  onToggle(event: any) {
    this.toggle.emit(event);
  }

  onSubmit(event: any) {
    event.stopPropagation();
    this.submit.emit(this.parent);
  }

}
