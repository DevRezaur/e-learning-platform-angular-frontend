import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CategoryService } from 'src/app/shared/service/category.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';
import { CommonUtil } from 'src/app/shared/util/common.util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  featuredCourses: any[] = [];
  categories: string[] = [];

  constructor(
    private backendApiService: BackendApiService,
    private categoryService: CategoryService,
    private popNotificationService: PopNotificationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getFeaturedCourses();
    this.getCategories();
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

  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  getCoursesByCategory(category: string): void {
    this.popNotificationService.setMessage(
      'This functionality will be available soon!'
    );
  }
}
