import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss'],
})
export class CourseDashboardComponent implements OnInit {
  courseId: string | null = null;
  course: any;
  courseContents: any[] = [];
  contentDataForm: any;

  constructor(
    private backendApiService: BackendApiService,
    private route: ActivatedRoute,
    private popNotificationService: PopNotificationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['courseId'];
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId);
        this.fetchCourseContents(this.courseId);
      }
    });
  }

  fetchCourseDetails(courseId: string): void {
    this.backendApiService.callGetCourseAPI(courseId).subscribe({
      next: (response) => {
        this.course = response.responseBody.course;
        if (this.course.imageUrl) {
          this.loadCourseImage(this.course.imageUrl);
        }
      },
      error: (error) => {
        this.popNotificationService.error(error.error.errorMessage);
      },
    });
  }

  fetchCourseContents(courseId: string): void {
    this.backendApiService.callGetCourseContentsAPI(courseId).subscribe({
      next: (response) => {
        this.courseContents = response.responseBody.courseContents;
        console.log(this.courseContents);
      },
      error: (error) => {
        this.popNotificationService.error(error.error.errorMessage);
      },
    });
  }

  loadCourseImage(imageUrl: string): void {
    this.getCourseImage(imageUrl).subscribe({
      next: (image) => {
        this.course.image = this.sanitizer.bypassSecurityTrustUrl(image);
      },
      error: (error) => console.error(error),
    });
  }

  getCourseImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
  }

  onContentSelected(event: any) {
    const content = event.target.files[0];
    if (content) {
      console.log(content);
    }
  }

  saveContentData(): void {}
}
