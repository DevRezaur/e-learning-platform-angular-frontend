import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AUTH_SERVICE,
  AuthServiceInterface,
} from 'src/app/shared/service/auth-service.interface';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginDataForm: FormGroup;

  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthServiceInterface,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {
    this.loginDataForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    this.commonService.markFormGroupTouched(this.loginDataForm);
    if (!this.loginDataForm.valid) return;

    this.authService.login(
      this.loginDataForm.value.email,
      this.loginDataForm.value.password
    );
  }
}
