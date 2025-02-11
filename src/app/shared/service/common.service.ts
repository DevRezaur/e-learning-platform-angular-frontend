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
    { label: 'Home', route: '/', logo: 'fas fa-laptop-code' },
    {
      label: 'Learning Dashboard',
      route: '/user/dashboard',
      logo: 'fas fa-laptop-code',
    },
    {
      label: 'Profile',
      route: '/user/general/profile',
      logo: 'fas fa-laptop-code',
    },
  ];
  private adminMenu: any[] = [
    { label: 'Home', route: '/', logo: 'fas fa-laptop-code' },
    {
      label: 'Admin Dashboard',
      route: '/admin/dashboard',
      logo: 'fas fa-laptop-code',
    },
    {
      label: 'Payment Requests',
      route: '/admin/payments',
      logo: 'fas fa-laptop-code',
    },
    {
      label: 'Profile',
      route: '/admin/general/profile',
      logo: 'fas fa-laptop-code',
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
      route: '',
      logo: 'fas fa-users',
    },
    {
      label: 'Add New User',
      route: '',
      logo: 'fas fa-user-plus',
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
    return this.backendApiService.callGetContentAPI(imageUrl).pipe(
      map((response) => {
        const objectUrl = URL.createObjectURL(new Blob([response]));
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      })
    );
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
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
}
