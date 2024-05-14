import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  NotFoundPageComponent,
  UserListItemPageComponent,
  UserListPageComponent,
} from '../pages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NotFoundPageComponent,
    UserListItemPageComponent,
    UserListPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-app';
}
