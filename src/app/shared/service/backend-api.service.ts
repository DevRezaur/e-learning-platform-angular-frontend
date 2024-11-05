import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private baseUrl = 'http://localhost:9191';

  constructor(private httpClient: HttpClient) {}

  // User Management APIs
  callLoginAPI(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/user-management-api/login`, {
      username: username,
      password: password,
    });
  }

  callUserRegistrationAPI(userData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/user-management-api`,
      userData
    );
  }

  callGetUserByIdAPI(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/user-management-api/${userId}`);
  }

  callUpdatePasswordAPI(userId: string, password: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/user-management-api/password`,
      {
        userId: userId,
        password: password,
      }
    );
  }

  // Course Management APIs
  callGetAllCoursesAPI(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/course-management-api`);
  }

  callGetCourseAPI(courseId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-management-api/${courseId}`
    );
  }

  callGetCoursePreviewAPI(courseId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-content-management-api/${courseId}/preview`
    );
  }

  /// Un-managed APIs (Will be fixed later)

  callGetContentAPI(contentUrl: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/content-management-api/${contentUrl}`,
      {
        responseType: 'arraybuffer',
      }
    );
  }

  callSaveContentsAPI(contents: any[]): Observable<any> {
    const formData = new FormData();
    contents.forEach((content) => {
      formData.append('contents', content);
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post(`${this.baseUrl}/content-api`, formData, {
      headers: headers,
    });
  }

  callGetCourseListAPI(pageNumber: number, limit: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-page-api?pageNumber=${pageNumber}&limit=${limit}`
    );
  }

  callGetCourseContentsAPI(courseId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-content-api/${courseId}`
    );
  }

  callCreateCourseAPI(courseData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/course-page-api`, courseData);
  }

  callUpdateCourseAPI(courseData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/course-page-api/update`,
      courseData
    );
  }

  callUpdateProfileAPI(userData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/user-management-api/profile`,
      userData
    );
  }

  callUpdateImageUrlAPI(userId: string, image: File): Observable<any> {
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

  callSavePaymentAPI(paymentInfo: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/payment-api`, paymentInfo);
  }

  callGetAllPaymentsAPI(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/payment-api`);
  }

  callUpdatePaymentStatusAPI(paymentStatusMap: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/payment-api/approval`,
      paymentStatusMap
    );
  }

  callEnrollToCourseAPI(courseEnrollmentInfo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/course-page-api/enroll`,
      courseEnrollmentInfo
    );
  }

  callGetAllEnrolledCoursesAPI(userId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-page-api/enrolled-courses?userId=${userId}`
    );
  }

  callVideoStreamAPI(videoUrl: string): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8082/content/stream/' + videoUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'video/mp4',
        }),
        responseType: 'blob',
      }
    );
  }
}
