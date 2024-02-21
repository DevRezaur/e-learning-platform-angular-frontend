import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private baseUrl = 'http://localhost:9191';

  constructor(private httpClient: HttpClient) {}

  callHomePageAPI(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/home-page-api`);
  }

  callGetContentAPI(contentUrl: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/content-api/${contentUrl}`, {
      responseType: 'arraybuffer',
    });
  }

  callGetCourseListAPI(pageNumber: number, limit: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-page-api?pageNumber=${pageNumber}&limit=${limit}`
    );
  }
}
