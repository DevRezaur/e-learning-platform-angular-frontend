import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';

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
    this.loadHomePageData();
  }

  loadHomePageData(): void {
    this.backendApiService.callHomePageAPI().subscribe({
      next: (response) => {
        this.featuredCourses = response?.responseBody?.courseList || [];
        this.loadImages();
      },
      error: (error) => console.error(error),
    });
  }

  loadImages(): void {
    this.featuredCourses.forEach((course) => {
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
