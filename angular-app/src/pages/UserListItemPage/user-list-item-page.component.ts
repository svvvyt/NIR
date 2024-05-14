import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { DataItemProps } from '../../types';

import { DataItemService } from '../../services/data-list-item.service';

import { UserListItemComponent, LoadingBlockComponent } from '../../components';

@Component({
  standalone: true,
  imports: [UserListItemComponent, LoadingBlockComponent],
  selector: 'user-list-item-page',
  template: `
    <div>
      @if(isLoading) {
      <loading-block [text]="'user-item'"></loading-block>
      } @else if(!isLoading) {
      <user-list-item [item]="dataItem"></user-list-item>
      }
    </div>
  `,
  styleUrls: ['./user-list-item-page.component.css'],
})
export class UserListItemPageComponent implements OnInit {
  dataItem: DataItemProps | undefined;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataItemService: DataItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
      }
    });
  }

  loadData(id: string): void {
    this.dataItemService.getDataItem(id).subscribe(
      (data: DataItemProps) => {
        this.dataItem = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }
}
