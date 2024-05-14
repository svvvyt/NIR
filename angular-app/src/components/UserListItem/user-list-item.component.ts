import { Component, Input } from '@angular/core';
import { DataItemProps } from '../../types';

@Component({
  standalone: true,
  selector: 'user-list-item',
  template: `
    <div class="data-item">
      <div>user id: {{ item?.id }}</div>
      <div>name: {{ item?.name }}</div>
      <div>username: {{ item?.username }}</div>
      <div>email: {{ item?.email }}</div>
      <div>phone: {{ item?.phone }}</div>
      <div>website: {{ item?.website }}</div>
      <div>street: {{ item?.address?.street }}</div>
      <div>city: {{ item?.address?.city }}</div>
      <div>zip-code: {{ item?.address?.zipcode }}</div>
    </div>
  `,
  styleUrls: [`./user-list-item.component.css`],
})
export class UserListItemComponent {
  @Input() item?: DataItemProps;
}
