import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  featuredCourses: any[];

  constructor(
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {
    this.featuredCourses = [];
  }

  ngOnInit(): void {
    this.backendApiService.callHomeScreenAPI().subscribe({
      next: (response) => {
        this.featuredCourses = response['responseBody']['courseList'].map(
          (course: any) => ({
            ...course,
            image: null,
            loading: true,
          })
        );
        this.loadImages();
      },
      error: (error) => console.error(error),
    });
  }

  loadImages(): void {
    this.featuredCourses.forEach((course, index) => {
      this.backendApiService.callGetContentAPI(course.imageUrl).subscribe({
        next: (response: ArrayBuffer) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageDataUrl = reader.result as string;
            const sanitizedUrl =
              this.sanitizer.bypassSecurityTrustUrl(imageDataUrl);
            this.featuredCourses[index].image = sanitizedUrl;
            this.featuredCourses[index].loading = false; // Set loading to false once image is loaded
          };
          reader.readAsDataURL(new Blob([response]));
        },
        error: (error) => {
          console.error('Error loading image:', error);
          // Optionally handle the error or provide a fallback image
          this.featuredCourses[index].loading = false; // Set loading to false if image loading fails
        },
      });
    });
  }
}
