import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-course-preview-page',
  templateUrl: './course-preview-page.component.html',
  styleUrls: ['./course-preview-page.component.scss'],
})
export class CoursePreviewPageComponent implements OnInit {
  courseData: any;
  contentsPreview: any[] = [];

  constructor(
    private backendApiService: BackendApiService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['courseId'];
      if (courseId) {
        this.fetchCourseData(courseId);
        this.fetchCourseContentPreview(courseId);
      }
    });
  }

  private fetchCourseData(courseId: string) {
    this.backendApiService
      .callGetCourseByIdAPI(courseId)
      .subscribe((response) => {
        this.courseData = response.responseBody.course;
        this.loadImage();
      });
  }

  private loadImage(): void {
    this.commonService
      .getImageFromImageUrl(this.courseData.imageUrl)
      .subscribe((safeUrl) => {
        this.courseData.image = safeUrl;
      });
  }

  private fetchCourseContentPreview(courseId: any): void {
    this.backendApiService
      .callGetCourseContentPreviewAPI(courseId)
      .subscribe((response) => {
        this.contentsPreview = response.responseBody.courseContentsPreview;
      });
  }
}
