import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginDataForm: FormGroup;

  constructor(
    private commonService: CommonService,
    private popNotificationService: PopNotificationService,
    private formBuilder: FormBuilder
  ) {
    this.loginDataForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.commonService.markFormGroupTouched(this.loginDataForm);
    if (!this.loginDataForm.valid) return;
  }

  private handleLoginSuccess(response: any): void {}

  private handleLoginError(response: any): void {
    const message = response.error.errorBody.errorMessage;
    this.popNotificationService.setMessage(message);
  }
}
