import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import {
  AUTH_SERVICE,
  AuthServiceInterface,
} from 'src/app/shared/service/auth-service.interface';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  profileImage: any;
  profileDataForm: FormGroup;
  passwordDataForm: FormGroup;

  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthServiceInterface,
    private backendApiService: BackendApiService,
    private popNotificationService: PopNotificationService,
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
    this.passwordDataForm = this.formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: [this.confirmPasswordValidator] }
    );
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    return !control.value.confirmPassword ||
      control.value.newPassword === control.value.confirmPassword
      ? null
      : { mismatch: true };
  }

  loadProfileData(): void {
    this.backendApiService
      .callGetUserByIdAPI(this.authService.getUserId())
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
      this.backendApiService.callUpdateProfileAPI(formData).subscribe({
        next: (response) => {
          this.popNotificationService.setMessage(response.responseBody.message);
        },
        error: (error) => {
          this.popNotificationService.setMessage(error.error.errorMessage);
        },
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

  onImageSelected(event: any) {
    const image: File = event.target.files[0];
    if (image) {
      const userId = this.authService.getUserId();
      this.backendApiService.callUpdateImageUrlAPI(userId, image).subscribe({
        next: (response) => {
          this.popNotificationService.setMessage(response.responseBody.message);
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(image)
          );
        },
        error: (error) => {
          this.popNotificationService.setMessage(error.error.errorMessage);
        },
      });
    }
  }

  updatePasswordData(): void {
    this.backendApiService
      .callUpdatePasswordAPI(
        this.authService.getUserId(),
        this.passwordDataForm.get('newPassword')?.value
      )
      .subscribe({
        next: (response) => {
          this.popNotificationService.setMessage(response.responseBody.message);
        },
        error: (error) => {
          this.popNotificationService.setMessage(error.error.errorMessage);
        },
      });
  }
}
