import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PizzaAppComponent } from './containers/pizza-app/pizza-app.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { PizzaCreatorComponent } from './components/pizza-creator/pizza-creator.component';
import { PizzaSizeComponent } from './components/pizza-size/pizza-size.component';
import { PizzaToppingsComponent } from './components/pizza-toppings/pizza-toppings.component';
import { PizzaViewerComponent } from './components/pizza-viewer/pizza-viewer.component';
import { PizzaSummaryComponent } from './components/pizza-summary/pizza-summary.component';
import { StateService } from './state.service';
import { AccordionContent, AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule,
    AccordionContent,
    CardModule,
    TooltipModule,
    RadioButtonModule,
    SelectButtonModule,
    CheckboxModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    MessageModule
  ],
  declarations: [
    PizzaAppComponent,
    PizzaFormComponent,
    PizzaCreatorComponent,
    PizzaSizeComponent,
    PizzaToppingsComponent,
    PizzaViewerComponent,
    PizzaSummaryComponent
  ],
  providers: [
    StateService,
    MessageService
  ],
  exports: [
    PizzaAppComponent
  ]
})
export class PizzaAppModule {}