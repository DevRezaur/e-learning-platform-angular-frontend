import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

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
    private commonService: CommonService,
    private popNotificationService: PopNotificationService
  ) {}

  ngOnInit(): void {
    this.getFeaturedCourses();
    this.getCategories();
  }

  getFeaturedCourses(): void {
    this.backendApiService.callGetAllCoursesAPI().subscribe((response) => {
      this.featuredCourses = response.responseBody.courseList;
      this.loadImages();
    });
  }

  loadImages(): void {
    this.featuredCourses.forEach((course) =>
      this.commonService
        .getImageFromImageUrl(course.imageUrl)
        .subscribe((safeUrl) => {
          course.image = safeUrl;
        })
    );
  }

  getCategories(): void {
    this.categories = this.commonService.getCategories();
  }

  getCoursesByCategory(category: string): void {
    this.popNotificationService.setMessage(
      'This functionality will be available soon!'
    );
  }
}
