import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  callGetUserDataAPI(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/profile-page-api/${userId}`);
  }

  callUpdateUserDataAPI(userData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/profile-page-api`, userData);
  }

  callUpdateUserImageAPI(userId: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post(
      `${this.baseUrl}/profile-page-api/image/${userId}`,
      formData,
      { headers: headers }
    );
  }
}
