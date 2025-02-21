import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss'],
})
export class CourseDashboardComponent implements OnInit {
  isAdmin: boolean = false;
  courseId!: string;
  courseData: any;
  courseContents: any[] = [];
  contentDataForm: FormGroup;
  contentToUpload: any;

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private commonService: CommonService,
    private popNotificationService: PopNotificationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.contentDataForm = this.formBuilder.group({
      contentTitle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.updateIsAdminStatus();

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

  onContentSelected(event: any) {
    this.contentToUpload = event.target.files[0];
    this.contentDataForm.patchValue({
      contentTitle: this.contentToUpload.name,
    });
  }

  uploadContent(): void {
    this.commonService.markFormGroupTouched(this.contentDataForm);
    if (!this.contentDataForm.valid) {
      return;
    } else if (!this.contentToUpload) {
      this.popNotificationService.setMessage('Choose a file to upload!');
      return;
    }
  }
}
