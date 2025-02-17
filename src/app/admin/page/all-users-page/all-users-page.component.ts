import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-all-users-page',
  templateUrl: './all-users-page.component.html',
  styleUrls: ['./all-users-page.component.scss'],
})
export class AllUsersPageComponent implements OnInit {
  users: any[] = [];

  constructor(
    private backendApiService: BackendApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.backendApiService.callGetAllRegularUser().subscribe((response) => {
      this.users = response.responseBody.userList;
      this.loadImages();
    });
  }

  private loadImages(): void {
    this.users.forEach((user) => {
      if (user.imageUrl) {
        this.commonService
          .getImageFromImageUrl(user.imageUrl)
          .subscribe((safeUrl) => {
            user.image = safeUrl;
          });
      }
    });
  }
}
