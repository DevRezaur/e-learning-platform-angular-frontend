import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  passwordPattern: RegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  userId!: string;
  userImage: any;
  profileDataForm: FormGroup;
  passwordDataForm: FormGroup;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private commonService: CommonService,
    private popNotificationService: PopNotificationService,
    private formBuilder: FormBuilder
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
          [Validators.required, Validators.pattern(this.passwordPattern)],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: [this.commonService.confirmPasswordValidator] }
    );
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadProfileData();
  }

  private loadProfileData(): void {
    this.backendApiService
      .callGetUserByIdAPI(this.userId)
      .subscribe((response) => {
        const userData = response.responseBody.user;
        this.profileDataForm.patchValue(userData);
        this.loadImage(userData.imageUrl);
      });
  }

  private loadImage(imageUrl: string): void {
    if (!imageUrl) return;

    this.commonService.getImageFromImageUrl(imageUrl).subscribe((safeUrl) => {
      this.userImage = safeUrl;
    });
  }

  updateProfile(): void {
    this.commonService.markFormGroupTouched(this.profileDataForm);
    if (!this.profileDataForm.valid) return;

    const userId = this.profileDataForm.get('userId')?.value;
    const email = this.profileDataForm.get('email')?.value;
    const formData = { ...this.profileDataForm.value, userId, email };

    this.backendApiService.callUpdateProfileAPI(formData).subscribe({
      next: (response) => this.handleSuccessResponse(response),
      error: (error) => this.handleErrorResponse(error),
    });
  }

  updateUserImage(event: any) {
    const image: File = event.target.files[0];
    if (!image) return;

    this.backendApiService.callSaveContentsAPI([image]).subscribe({
      next: (response) =>
        this.updateUserImageUrl(response.responseBody.urlList[0]),
      error: (error) => this.handleErrorResponse(error),
    });
  }

  private updateUserImageUrl(imageUrl: string): void {
    this.backendApiService
      .callUpdateUserImageUrlAPI(this.userId, imageUrl)
      .subscribe({
        next: (response) => {
          this.loadImage(imageUrl);
          this.handleSuccessResponse(response);
        },
        error: (error) => this.handleErrorResponse(error),
      });
  }

  updatePassword(): void {
    this.backendApiService
      .callUpdatePasswordAPI(
        this.userId,
        this.passwordDataForm.get('newPassword')?.value
      )
      .subscribe({
        next: (response) => this.handleSuccessResponse(response),
        error: (error) => this.handleErrorResponse(error),
      });
  }

  private handleSuccessResponse(response: any): void {
    const message = response.responseBody.message;
    this.popNotificationService.setMessage(message);
  }

  private handleErrorResponse(response: any): void {
    const message = response.error.errorBody.errorMessage;
    this.popNotificationService.setMessage(message);
  }
}
