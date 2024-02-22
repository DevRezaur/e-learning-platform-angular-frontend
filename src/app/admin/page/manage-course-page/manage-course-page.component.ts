import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';

@Component({
  selector: 'app-manage-course-page',
  templateUrl: './manage-course-page.component.html',
  styleUrls: ['./manage-course-page.component.scss'],
})
export class ManageCoursePageComponent implements OnInit {
  courseList: any[];
  pageNumber: number;
  limit: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {
    this.courseList = [];
    this.pageNumber = 1;
    this.limit = 10;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pageNumber = +params['pageNumber'] || 1;
      this.loadCourseData();
    });
  }

  loadCourseData(): void {
    this.backendApiService
      .callGetCourseListAPI(this.pageNumber - 1, this.limit)
      .subscribe({
        next: (response) => {
          this.courseList = response?.responseBody?.courseList || [];
          this.loadImages();
        },
        error: (error) => console.error(error),
      });
  }

  loadImages(): void {
    this.courseList.forEach((course) => {
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

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pageNumber: pageNumber },
      queryParamsHandling: 'merge',
    });
  }
}
