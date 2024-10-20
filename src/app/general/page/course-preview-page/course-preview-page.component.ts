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
        this.fetchCoursePreview(courseId);
      }
    });
  }

  fetchCourseData(courseId: string) {
    this.backendApiService.callGetCourseAPI(courseId).subscribe((response) => {
      this.courseData = response.responseBody.course;
      this.loadImage();
    });
  }

  loadImage(): void {
    this.commonService
      .getImageFromImageUrl(this.courseData.imageUrl)
      .subscribe((safeUrl) => {
        this.courseData.image = safeUrl;
      });
  }

  fetchCoursePreview(courseId: any): void {
    this.backendApiService
      .callGetCoursePreviewAPI(courseId)
      .subscribe((response) => {
        this.contentsPreview = response.responseBody.courseContentsPreview;
      });
  }
}
