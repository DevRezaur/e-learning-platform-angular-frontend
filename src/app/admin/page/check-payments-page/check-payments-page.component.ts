import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-check-payments-page',
  templateUrl: './check-payments-page.component.html',
  styleUrls: ['./check-payments-page.component.scss'],
})
export class CheckPaymentsPageComponent implements OnInit {
  paymentInfoList: any[] = [];

  constructor(
    private backendApiService: BackendApiService,
    private popNotificationService: PopNotificationService
  ) {}

  ngOnInit(): void {
    this.backendApiService.callGetAllPaymentInfoAPI().subscribe((response) => {
      this.paymentInfoList = response.responseBody.paymentInfoList;
    });
  }

  updatePaymentStatus(trxId: string, status: string): void {
    this.backendApiService.callUpdatePaymentStatusAPI(trxId, status).subscribe({
      next: (response) => {
        this.paymentInfoList.find(
          (paymentInfo) => paymentInfo.trxId === trxId
        ).status = status;
        this.handleSuccessResponse(response);
      },
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
