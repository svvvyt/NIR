import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataItemProps } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataItemService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getDataItem(id: string): Observable<DataItemProps> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DataItemProps>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong.');
  }
}
