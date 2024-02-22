import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profileDataForm: FormGroup;
  profileImage: any;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.profileDataForm = this.formBuilder.group({
      userId: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.backendApiService
      .callGetUserDataAPI(this.authService.getUserId())
      .subscribe({
        next: (response) => {
          const userData = response?.responseBody?.user || [];
          this.profileDataForm.patchValue(userData);
          this.loadImage(userData.imageUrl);
        },
        error: (error) => console.error(error),
      });
  }

  loadImage(imageUrl: string): void {
    this.getImage(imageUrl).subscribe({
      next: (image) => {
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(image);
      },
      error: (error) => console.error(error),
    });
  }

  getImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
  }

  updateProfileData(): void {
    this.markFormGroupTouched(this.profileDataForm);
    if (this.profileDataForm.valid) {
      const userId = this.profileDataForm.get('userId')?.value;
      const email = this.profileDataForm.get('email')?.value;
      const formData = { ...this.profileDataForm.value, userId, email };
      this.backendApiService.callUpdateUserDataAPI(formData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => console.error(error),
      });
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
