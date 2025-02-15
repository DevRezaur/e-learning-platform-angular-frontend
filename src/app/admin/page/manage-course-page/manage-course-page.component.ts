import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-manage-course-page',
  templateUrl: './manage-course-page.component.html',
  styleUrls: ['./manage-course-page.component.scss'],
})
export class ManageCoursePageComponent implements OnInit {
  courseList: any[] = [];
  totalCount: number = 0;
  pageNumber: number = 1;
  limit: number = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendApiService: BackendApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pageNumber = +params['pageNumber'] || 1;
      this.fetchCourseList();
    });
  }

  private fetchCourseList(): void {
    this.backendApiService
      .callGetAllCoursesAPI(this.pageNumber - 1, this.limit)
      .subscribe((response) => {
        this.totalCount = response.responseBody.totalCount;
        this.courseList = response.responseBody.courseList;
        this.loadImages();
      });
  }

  private loadImages(): void {
    this.courseList.forEach((course) =>
      this.commonService
        .getImageFromImageUrl(course.imageUrl)
        .subscribe((safeUrl) => {
          course.image = safeUrl;
        })
    );
  }

  onPageChange(pageNumber: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pageNumber: pageNumber },
      queryParamsHandling: 'merge',
    });
  }

  isNextPageEnabled(): boolean {
    return this.commonService.isNextPageEnabled(
      this.totalCount,
      this.pageNumber,
      this.limit
    );
  }
}
