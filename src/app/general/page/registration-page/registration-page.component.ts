import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  passwordPattern: RegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  userDataForm: FormGroup;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private commonService: CommonService,
    private popNotificationService: PopNotificationService,
    private formBuilder: FormBuilder
  ) {
    this.userDataForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        password: [
          '',
          [Validators.required, Validators.pattern(this.passwordPattern)],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: [this.commonService.confirmPasswordValidator] }
    );
  }

  login(): void {
    this.authService.login();
  }

  registerUser(): void {
    this.commonService.markFormGroupTouched(this.userDataForm);
    if (!this.userDataForm.valid) return;

    this.backendApiService
      .callUserRegistrationAPI(this.userDataForm.value)
      .subscribe({
        next: (response) => this.handleRegistrationSuccess(response),
        error: (error) => this.handleRegistrationError(error),
      });
  }

  private handleRegistrationSuccess(response: any): void {
    const message = response.responseBody.message;
    this.popNotificationService.setMessageWithAction(
      message,
      'Login',
      '/general/login'
    );
  }

  private handleRegistrationError(response: any): void {
    const message = response.error.errorBody.errorMessage;
    this.popNotificationService.setMessage(message);
  }
}
