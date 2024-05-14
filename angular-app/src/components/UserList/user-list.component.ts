import { Component, Input } from '@angular/core';

import { UserListItemComponent } from '../UserListItem/user-list-item.component';

import { DataItemProps } from '../../types';

@Component({
  standalone: true,
  imports: [UserListItemComponent],
  selector: 'user-list',
  template: `
    <div>
      @for(user of users; track user) {
      <user-list-item [item]="user"></user-list-item>
      }
    </div>
  `,
})
export class UserListComponent {
  @Input() users?: DataItemProps[];
}
