import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';
import { UploadService } from 'src/app/shared/service/upload.service';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss'],
})
export class CourseDashboardComponent implements OnInit {
  isAdmin: boolean = false;
  isUploading: boolean = false;
  courseId!: string;
  courseData: any;
  courseContents: any[] = [];
  courseContentDataForm: FormGroup;
  contentToUpload: any;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private commonService: CommonService,
    private uploadService: UploadService,
    private popNotificationService: PopNotificationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.courseContentDataForm = this.formBuilder.group({
      contentTitle: ['', Validators.required],
      contentType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.updateIsAdminStatus();
    this.updateIsUploadingStatus();

    this.route.params.subscribe((params) => {
      this.courseId = params['courseId'];
      if (this.courseId) {
        this.fetchCourseDetails();
        this.fetchCourseContents();
      }
    });
  }

  private updateIsAdminStatus(): void {
    this.authService.isLoggedIn().subscribe((loggedInStatus) => {
      if (loggedInStatus) {
        this.isAdmin = this.authService.isAdmin();
      }
    });
  }

  private updateIsUploadingStatus(): void {
    this.uploadService.getUploadStatus().subscribe((uploadStatus) => {
      this.isUploading = uploadStatus;
    });
  }

  private fetchCourseDetails(): void {
    this.backendApiService
      .callGetCourseByIdAPI(this.courseId)
      .subscribe((response) => {
        this.courseData = response.responseBody.course;
        this.loadImage();
      });
  }

  private loadImage(): void {
    this.commonService
      .getImageFromImageUrl(this.courseData.imageUrl)
      .subscribe((safeUrl) => {
        this.courseData.image = safeUrl;
      });
  }

  private fetchCourseContents(): void {
    this.backendApiService
      .callGetCourseContentsAPI(this.courseId)
      .subscribe((response) => {
        this.courseContents = response.responseBody.courseContents;
        this.streamVideo();
      });
  }

  private streamVideo(): void {
    this.courseContents.forEach((content) => {
      this.commonService
        .getVideoFromVideoUrl(content.contentUrl)
        .subscribe((safeUrl) => {
          content.video = safeUrl;
        });
    });
  }

  onCourseContentSelected(event: any) {
    this.contentToUpload = event.target.files[0];
    this.courseContentDataForm.patchValue({
      contentTitle: this.contentToUpload.name,
      contentType: this.contentToUpload.type,
    });
  }

  uploadCourseContent(): void {
    this.commonService.markFormGroupTouched(this.courseContentDataForm);
    if (!this.courseContentDataForm.valid) {
      return;
    } else if (!this.contentToUpload) {
      this.popNotificationService.setMessage('Choose a file to upload!');
      return;
    }

    this.uploadService.uploadFile(this.contentToUpload).then((observable) => {
      observable.subscribe({
        next: (response) => {
          const contentUrl = response.responseBody.urlList[0];
          this.saveCourseContentData(this.courseId, contentUrl);
        },
        error: (error) => this.handleErrorResponse(error),
      });
    });
  }

  deleteCourseContent(contentId: string): void {
    this.backendApiService.callDeleteCourseContentAPI(contentId).subscribe({
      next: (response) => this.handleSuccessResponse(response),
      error: (error) => this.handleErrorResponse(error),
    });
  }

  private saveCourseContentData(courseId: string, contentUrl: string): void {
    const formData = {
      ...this.courseContentDataForm.value,
      courseId,
      contentUrl,
    };

    this.backendApiService.callAddCourseContentAPI(formData).subscribe({
      next: (response) => this.handleSuccessResponse(response),
      error: (error) => this.handleErrorResponse(error),
    });
  }

  private handleSuccessResponse(response: any): void {
    this.fileInput.nativeElement.value = '';
    this.courseContentDataForm.reset();
    this.fetchCourseContents();

    const message = response.responseBody.message;
    this.popNotificationService.setMessage(message);
  }

  private handleErrorResponse(response: any): void {
    this.fileInput.nativeElement.value = '';
    this.courseContentDataForm.reset();

    const message = response.error.errorBody.errorMessage;
    this.popNotificationService.setMessage(message);
  }
}
