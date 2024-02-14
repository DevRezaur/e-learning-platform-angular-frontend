import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private baseUrl = 'http://localhost:9191';

  constructor(private httpClient: HttpClient) {}

  callHomeScreenAPI(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/home-screen-api`);
  }
}
