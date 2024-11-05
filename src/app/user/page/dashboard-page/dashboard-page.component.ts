import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import {
  AUTH_SERVICE,
  AuthServiceInterface,
} from 'src/app/shared/service/auth-service.interface';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  enrolledCourses: any[];

  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthServiceInterface,
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {
    this.enrolledCourses = [];
  }

  ngOnInit(): void {
    this.fetchEnrolledCourses();
  }

  fetchEnrolledCourses(): void {
    this.backendApiService
      .callGetAllEnrolledCoursesAPI(this.authService.getUserId())
      .subscribe({
        next: (response) => {
          this.enrolledCourses = response.responseBody.courseList;
          this.loadImages();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  loadImages(): void {
    this.enrolledCourses.forEach((course) => {
      this.getImage(course.imageUrl).subscribe({
        next: (image) => {
          course.image = this.sanitizer.bypassSecurityTrustUrl(image);
        },
        error: (error) => console.error(error),
      });
    });
  }

  getImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
  }
}
