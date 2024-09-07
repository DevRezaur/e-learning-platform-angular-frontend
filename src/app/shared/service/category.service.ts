import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: string[] = [
    'Java',
    'Spring & Spring Boot',
    'Angular',
    'React JS',
    'HTML & CSS',
    'Others',
  ];

  getCategories(): string[] {
    return this.categories;
  }
}
