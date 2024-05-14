import { Routes } from '@angular/router';
import {
  UserListPageComponent,
  UserListItemPageComponent,
  NotFoundPageComponent,
} from '../pages';

export const routes: Routes = [
  { path: 'users/limit/:limit', component: UserListPageComponent },
  { path: 'users/:id', component: UserListItemPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
