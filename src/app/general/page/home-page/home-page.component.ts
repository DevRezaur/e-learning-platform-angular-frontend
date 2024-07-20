import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonUtil } from 'src/app/shared/util/common.util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  featuredCourses: any[] = [];

  constructor(
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getFeaturedCourses();
  }

  getFeaturedCourses(): void {
    this.backendApiService.callGetAllCoursesAPI().subscribe({
      next: (successResponse) => {
        this.featuredCourses = successResponse.responseBody.courseList || [];
        this.loadImages();
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      },
    });
  }

  loadImages(): void {
    this.featuredCourses.forEach((course) => {
      CommonUtil.getImageFromImageUrl(
        course.imageUrl,
        this.backendApiService
      ).subscribe({
        next: (image) => {
          course.image = this.sanitizer.bypassSecurityTrustUrl(image);
        },
        error: (error) => console.error(error),
      });
    });
  }
}
