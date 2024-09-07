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
  private userMenu: any[] = [
    { label: 'Home', route: '/' },
    { label: 'Learning Dashboard', route: '/user/dashboard' },
    { label: 'Profile', route: '/user/general/profile' },
  ];
  private adminMenu: any[] = [
    { label: 'Home', route: '/' },
    { label: 'Admin Dashboard', route: '/admin/dashboard' },
    { label: 'Payment Requests', route: '/admin/payments' },
    { label: 'Profile', route: '/admin/general/profile' },
  ];

  constructor(
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {}

  getCategories(): string[] {
    return this.categories;
  }

  getUserMenu(): any[] {
    return this.userMenu;
  }

  getAdminMenu(): any[] {
    return this.adminMenu;
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
