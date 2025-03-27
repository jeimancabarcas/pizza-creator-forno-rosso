import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PizzaAppComponent } from './pizza-app/containers/pizza-app/pizza-app.component';
import { PizzaAppModule } from './pizza-app/pizza-app.module';

@Component({
  selector: 'app-root',
  imports: [PizzaAppModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizza-creator-forno-rosso';
}
