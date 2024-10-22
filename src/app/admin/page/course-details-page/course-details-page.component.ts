import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'course-details-page',
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss'],
})
export class CourseDetailsPageComponent implements OnInit {
  courseId: string | null = null;
  courseImage: any;
  courseImageUrl: any;
  courseImageFile: any;
  courseDataForm: FormGroup;

  constructor(
    private backendApiService: BackendApiService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['courseId'];
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId);
      }
    });
  }

  fetchCourseDetails(courseId: string): void {
    this.backendApiService.callGetCourseAPI(courseId).subscribe({
      next: (response) => {
        const courseDetails = response.responseBody.course;
        this.courseDataForm.patchValue({
          courseName: courseDetails.courseName,
          description: courseDetails.description,
          courseFee: courseDetails.courseFee,
          discount: courseDetails.discount,
          isEnrollmentEnabled: courseDetails.isEnrollmentEnabled,
        });
        if (courseDetails.imageUrl) {
          this.courseImageUrl = courseDetails.imageUrl;
          this.loadCourseImage(this.courseImageUrl);
        }
      },
      error: (error) => {
        this.popNotificationService.setMessage(error.error.errorMessage);
      },
    });
  }

  loadCourseImage(imageUrl: string): void {
    this.getCourseImage(imageUrl).subscribe({
      next: (image) => {
        this.courseImage = this.sanitizer.bypassSecurityTrustUrl(image);
      },
      error: (error) => console.error(error),
    });
  }

  getCourseImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
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
          this.courseImageUrl = response;
          this.createNewCourse();
        },
        error: () => {
          this.popNotificationService.setMessage('Choose a course image!');
        },
      });
    }
  }

  updateCourseData(): void {
    this.markFormGroupTouched(this.courseDataForm);
    if (this.courseDataForm.valid) {
      if (this.courseImageFile) {
        this.saveCourseImage().subscribe({
          next: (response) => {
            this.courseImageUrl = response;
            this.updateCourse();
          },
          error: () => {
            this.popNotificationService.setMessage('Choose a course image!');
          },
        });
      } else {
        this.updateCourse();
      }
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

  createNewCourse(): void {
    const formData = {
      ...this.courseDataForm.value,
      imageUrl: this.courseImageUrl,
    };
    this.backendApiService.callCreateCourseAPI(formData).subscribe({
      next: (response) => {
        this.popNotificationService.setMessage(response.responseBody.message);
      },
      error: (error) => {
        this.popNotificationService.setMessage(error.error.errorMessage);
      },
    });
  }

  updateCourse(): void {
    const formData = {
      ...this.courseDataForm.value,
      courseId: this.courseId,
      imageUrl: this.courseImageUrl,
    };
    this.backendApiService.callUpdateCourseAPI(formData).subscribe({
      next: (response) => {
        this.popNotificationService.setMessage(response.responseBody.message);
      },
      error: (error) => {
        this.popNotificationService.setMessage(error.error.errorMessage);
      },
    });
  }
}
