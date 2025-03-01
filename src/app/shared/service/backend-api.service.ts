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
  callUserRegistrationAPI(userData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/user-management-api/register`,
      userData
    );
  }

  callInitUserAPI(userData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/user-management-api/init`,
      userData
    );
  }

  callGetUserByIdAPI(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/user-management-api/${userId}`);
  }

  callGetAllRegularUser(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/user-management-api`);
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

  callUpdateProfileAPI(userData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/user-management-api/profile`,
      userData
    );
  }

  callUpdateUserImageUrlAPI(userId: string, imageUrl: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/user-management-api/image`, {
      userId: userId,
      imageUrl: imageUrl,
    });
  }

  // Course Management APIs
  callGetAllCoursesAPI(pageNumber: number, limit: number): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-management-api?pageNumber=${pageNumber}&limit=${limit}`
    );
  }

  callGetCourseByIdAPI(courseId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-management-api/${courseId}`
    );
  }

  callCreateCourseAPI(courseData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/course-management-api`,
      courseData
    );
  }

  callUpdateCourseAPI(courseData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/course-management-api/update`,
      courseData
    );
  }

  callGetAllEnrolledCoursesAPI(userId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-management-api/enrollment/${userId}`
    );
  }

  callGetEnrollmentStatusAPI(
    courseId: string,
    userId: string
  ): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-management-api/enrollment/${courseId}/${userId}`
    );
  }

  // Course Content Management APIs
  callGetCourseContentPreviewAPI(courseId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-content-management-api/${courseId}/preview`
    );
  }

  callGetCourseContentsAPI(courseId: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}/course-content-management-api/${courseId}`
    );
  }

  callAddCourseContentAPI(courseContentData: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/course-content-management-api`,
      courseContentData
    );
  }

  callDeleteCourseContentAPI(contentId: string): Observable<any> {
    return this.httpClient.delete(
      `${this.baseUrl}/course-content-management-api/${contentId}`
    );
  }

  // Payment Management APIs
  callGetAllPaymentInfoAPI(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/payment-management-api`);
  }

  callSavePaymentInfoAPI(paymentInfo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/payment-management-api`,
      paymentInfo
    );
  }

  callUpdatePaymentStatusAPI(paymentInfo: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}/payment-management-api/approval`,
      paymentInfo
    );
  }

  // Content Management APIs
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

    return this.httpClient.post(
      `${this.baseUrl}/content-management-api`,
      formData,
      {
        headers: headers,
      }
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

  callSaveVideoContentAPI(contents: any[]): Observable<any> {
    const formData = new FormData();
    contents.forEach((content) => {
      formData.append('contents', content);
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post('http://localhost:8082/content', formData, {
      headers: headers,
    });
  }
}
