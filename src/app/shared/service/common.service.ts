import { Injectable } from '@angular/core';
import { BackendApiService } from './backend-api.service';
import { map, Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private categories: string[] = [
    'Java',
    'Spring Boot',
    'Angular',
    'React JS',
    'HTML & CSS',
    'Others',
  ];
  private userMenu: any[] = [
    { label: 'Home', route: '/', logo: 'fas fa-home' },
    {
      label: 'Learning Dashboard',
      route: '/user/dashboard',
      logo: 'fas fa-chalkboard-teacher',
    },
    {
      label: 'Profile',
      route: '/user/general/profile',
      logo: 'far fa-address-card',
    },
  ];
  private adminMenu: any[] = [
    { label: 'Home', route: '/', logo: 'fas fa-home' },
    {
      label: 'Admin Dashboard',
      route: '/admin/dashboard',
      logo: 'fas fa-user-shield',
    },
    {
      label: 'Profile',
      route: '/admin/general/profile',
      logo: 'far fa-address-card',
    },
  ];
  private adminActionItems: any[] = [
    {
      label: 'Manage Courses',
      route: '/admin/manage-course',
      logo: 'fas fa-file-word',
    },
    {
      label: 'Add New Course',
      route: '/admin/course-details',
      logo: 'fas fa-file-import',
    },
    {
      label: 'All Users',
      route: '/admin/all-users',
      logo: 'fas fa-users',
    },
    {
      label: 'Payment Requests',
      route: '/admin/check-payments',
      logo: 'fas fa-money-check-alt',
    },
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

  getAdminActionItems(): any[] {
    return this.adminActionItems;
  }

  getImageFromImageUrl(imageUrl: string): Observable<SafeUrl> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => this.getSafeUrl(response)));
  }

  getVideoFromVideoUrl(videoUrl: string): Observable<SafeUrl> {
    return this.backendApiService
      .callVideoStreamAPI(videoUrl)
      .pipe(map((response) => this.getSafeUrl(response)));
  }

  getSafeUrl(imageData: any): SafeUrl {
    const objectUrl = URL.createObjectURL(new Blob([imageData]));
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password =
      control.get('password')?.value ?? control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (!confirmPassword) {
      return null;
    }
    return password === confirmPassword ? null : { mismatch: true };
  }

  markFormGroupTouched(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
    Object.values(formGroup.controls)
      .filter((control) => control instanceof FormGroup)
      .forEach((control) => this.markFormGroupTouched(control as FormGroup));
  }

  isNextPageEnabled(
    totalCount: number,
    currentPageNo: number,
    limit: number
  ): boolean {
    const totalPages = Math.ceil(totalCount / limit);
    return currentPageNo < totalPages;
  }
}
