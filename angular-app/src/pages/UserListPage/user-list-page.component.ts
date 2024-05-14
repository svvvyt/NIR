import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserListComponent, LoadingBlockComponent } from '../../components';

import { DataItemProps } from '../../types';

import { DataListService } from '../../services/data-list.service';

@Component({
  standalone: true,
  imports: [UserListComponent, LoadingBlockComponent],
  selector: 'user-list-page',
  template: `
    <div>
      @if(isLoading) {
      <loading-block [text]="'user-list'"></loading-block>
      } @else if(!isLoading) {
      <user-list [users]="dataList"></user-list>
      }
    </div>
  `,
  styleUrls: ['./user-list-page.component.css'],
})
export class UserListPageComponent implements OnInit {
  dataList: DataItemProps[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataListService: DataListService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const limit = params.get('limit');
      this.loadData(limit);
    });
  }

  loadData(limit: string | null): void {
    if (!limit) return;

    this.dataListService.getDataList(limit).subscribe(
      (data: DataItemProps[]) => {
        this.dataList = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }
}
