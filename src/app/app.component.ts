import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService) { }

}
