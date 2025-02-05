import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginDataForm: FormGroup;

  constructor(
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
  }
}
