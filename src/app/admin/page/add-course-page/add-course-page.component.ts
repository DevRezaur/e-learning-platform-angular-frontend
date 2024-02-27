import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent {
  courseImage: any;
  courseDataForm: FormGroup;

  constructor(
    private backendApiService: BackendApiService,
    private popNotificationService: PopNotificationService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.courseDataForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      courseFee: [
        '',
        [Validators.required, Validators.min(100), Validators.max(100000)],
      ],
      discount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(90)],
      ],
      isEnrollmentEnabled: ['', Validators.required],
    });
  }

  onImageSelected(event: any) {
    const image: File = event.target.files[0];
    if (image) {
      this.courseImage = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(image)
      );
    }
  }

  saveCourseData(): void {
    this.markFormGroupTouched(this.courseDataForm);
    console.log(this.courseDataForm.value);
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
