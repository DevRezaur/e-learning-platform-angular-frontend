import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  featuredCourses: any[];

  constructor(private backendApiService: BackendApiService) {
    this.featuredCourses = [];
  }

  ngOnInit(): void {
    this.backendApiService.callHomeScreenAPI().subscribe({
      next: (result) =>
        (this.featuredCourses = result['responseBody']['courseList']),
      error: (error) => console.error(error),
    });
  }
}
