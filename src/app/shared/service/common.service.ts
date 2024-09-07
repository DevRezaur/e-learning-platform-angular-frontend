import { Injectable } from '@angular/core';
import { BackendApiService } from './backend-api.service';
import { map, Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private categories: string[] = [
    'Java',
    'Spring & Spring Boot',
    'Angular',
    'React JS',
    'HTML & CSS',
    'Others',
  ];

  constructor(
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {}

  getCategories(): string[] {
    return this.categories;
  }

  getImageFromImageUrl(imageUrl: string): Observable<SafeUrl> {
    return this.backendApiService.callGetContentAPI(imageUrl).pipe(
      map((response) => {
        const objectUrl = URL.createObjectURL(new Blob([response]));
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      })
    );
  }
}
