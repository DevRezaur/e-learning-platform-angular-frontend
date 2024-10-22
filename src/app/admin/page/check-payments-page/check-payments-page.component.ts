import { Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/shared/service/backend-api.service';
import { PopNotificationService } from 'src/app/shared/service/pop-notification.service';

@Component({
  selector: 'app-check-payments-page',
  templateUrl: './check-payments-page.component.html',
  styleUrls: ['./check-payments-page.component.scss'],
})
export class CheckPaymentsPageComponent implements OnInit {
  paymentInfoList: any[];

  constructor(
    private backendApiService: BackendApiService,
    private popNotificationService: PopNotificationService
  ) {
    this.paymentInfoList = [];
  }

  ngOnInit(): void {
    this.backendApiService.callGetAllPaymentsAPI().subscribe({
      next: (response) => {
        this.paymentInfoList = response.responseBody.paymentInfoList;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updatePaymentStatus(trxId: string, status: string): void {
    const paymentStatusMap = { trxId, status };
    this.backendApiService
      .callUpdatePaymentStatusAPI(paymentStatusMap)
      .subscribe({
        next: (response) => {
          this.popNotificationService.setMessage(response.responseBody.message);
          this.paymentInfoList.find(
            (paymentInfo) => paymentInfo.trxId === trxId
          ).status = status;
        },
        error: (error) => {
          this.popNotificationService.setMessage(error.error.errorMessage);
        },
      });
  }
}
