import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  enrolledCourses: any[] = [
    {
      courseId: '550e8400-e29b-41d4-a716-446655440002',
      courseName: 'Introduction to Programming',
      description:
        'Learn the basics of programming with our easy and intuitive programming course. Highly recommended for CS students.',
      imageUrl: 'file-system-storage/b1e8dcd36f581b8b3f05e2528b2463a5.jpg',
      isEnrollmentEnabled: true,
      courseFee: 10000,
      discount: 10,
    },
  ];

  constructor(
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadImages();
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
