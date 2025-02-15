import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'course-details-page',
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss'],
})
export class CourseDetailsPageComponent implements OnInit {
  courseId?: string;
  courseImage: any;
  courseImageUrl: any;
  courseDataForm: FormGroup;

  constructor(
    private backendApiService: BackendApiService,
    private commonService: CommonService,
    private popNotificationService: PopNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.courseDataForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
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
    this.backendApiService.callGetCourseByIdAPI(courseId).subscribe({
      next: (response) => {
        const courseDetails = response.responseBody.course;
        this.courseImageUrl = courseDetails.imageUrl;
        this.courseDataForm.patchValue(courseDetails);
        this.loadImage();
      },
      error: (error) => this.handleErrorResponse(error),
    });
  }

  private loadImage(): void {
    this.commonService
      .getImageFromImageUrl(this.courseImageUrl)
      .subscribe((safeUrl) => {
        this.courseImage = safeUrl;
      });
  }

  updateCourseImage(event: any) {
    const image: File = event.target.files[0];
    if (!image) return;

    this.backendApiService.callSaveContentsAPI([image]).subscribe({
      next: (response) => {
        this.courseImageUrl = response.responseBody.urlList[0];
        this.loadImage();
      },
      error: (error) => this.handleErrorResponse(error),
    });
  }

  addNewCourse(): void {
    this.commonService.markFormGroupTouched(this.courseDataForm);
    if (!this.courseDataForm.valid) {
      return;
    } else if (!this.courseImageUrl) {
      this.popNotificationService.setMessage('Choose a course image!');
      return;
    }

    const courseData = {
      ...this.courseDataForm.value,
      imageUrl: this.courseImageUrl,
    };

    this.backendApiService.callCreateCourseAPI(courseData).subscribe({
      next: (response) => {
        this.courseId = response.responseBody.course.courseId;
        this.router.navigate(['/admin/course-details', this.courseId]);
        this.handleSuccessResponse(response);
      },
      error: (error) => this.handleErrorResponse(error),
    });
  }

  updateCourse(): void {
    this.commonService.markFormGroupTouched(this.courseDataForm);
    if (!this.courseDataForm.valid) {
      return;
    } else if (!this.courseImageUrl) {
      this.popNotificationService.setMessage('Choose a course image!');
      return;
    }

    const courseData = {
      ...this.courseDataForm.value,
      courseId: this.courseId,
      imageUrl: this.courseImageUrl,
    };

    this.backendApiService.callUpdateCourseAPI(courseData).subscribe({
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
