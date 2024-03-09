import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, catchError, map } from 'rxjs';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent {
  courseImageFile: any;
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
    this.courseImageFile = event.target.files[0];
    if (this.courseImageFile) {
      this.courseImage = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(this.courseImageFile)
      );
    }
  }

  saveCourseData(): void {
    this.markFormGroupTouched(this.courseDataForm);
    if (this.courseDataForm.valid) {
      this.saveCourseImage().subscribe({
        next: (response) => {
          this.createNewCourse(response);
        },
        error: (error) => {
          this.popNotificationService.error(error);
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

  saveCourseImage(): Observable<string> {
    return this.backendApiService
      .callSaveContentsAPI([this.courseImageFile])
      .pipe(
        map((response) =>
          response.responseBody.urlList &&
          response.responseBody.urlList.length > 0
            ? response.responseBody.urlList[0]
            : ''
        ),
        catchError((error) => {
          throw new Error(error.error.errorMessage);
        })
      );
  }

  createNewCourse(courseImageUrl: string): void {
    const formData = { ...this.courseDataForm.value, imageUrl: courseImageUrl };
    this.backendApiService.callCreateCourseAPI(formData).subscribe({
      next: (response) => {
        this.popNotificationService.success(response.responseBody.message);
      },
      error: (error) => {
        this.popNotificationService.error(error.error.errorMessage);
      },
    });
  }
}
