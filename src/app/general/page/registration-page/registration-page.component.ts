import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  isRegistrationSuccessful: boolean;
  userDataForm: FormGroup;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private popNotificationService: PopNotificationService,
    private formBuilder: FormBuilder
  ) {
    this.isRegistrationSuccessful = false;
    this.userDataForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        password: [
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

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    return !control.value.confirmPassword ||
      control.value.password === control.value.confirmPassword
      ? null
      : { mismatch: true };
  }

  registerUser(): void {
    this.markFormGroupTouched(this.userDataForm);
    if (this.userDataForm.valid) {
      this.backendApiService
        .callUserRegistrationAPI(this.userDataForm.value)
        .subscribe({
          next: (response) => {
            this.popNotificationService.setMessage(
              response.responseBody.message
            );
            this.isRegistrationSuccessful = true;
          },
          error: (error) => {
            this.popNotificationService.setMessage(error.error.errorMessage);
            this.isRegistrationSuccessful = false;
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

  login(): void {
    this.authService.login();
  }
}
