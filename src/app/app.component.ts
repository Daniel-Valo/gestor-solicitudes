import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  imports: [RouterOutlet], // o .scss si usas
})
export class AppComponent {
  title = 'gestor-solicitudes';
}
