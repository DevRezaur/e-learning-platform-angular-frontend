import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-payments-page',
  templateUrl: './check-payments-page.component.html',
  styleUrls: ['./check-payments-page.component.scss'],
})
export class CheckPaymentsPageComponent implements OnInit {
  paymentInfoList: any[] = [
    {
      paymentId: '67ec3dd5-6f9b-4717-bc25-62a01b653c2e',
      courseId: '550e8400-e29b-41d4-a716-446655440000',
      userId: '2022569c-8716-4df4-a076-b1238fd7f99d',
      paymentVendor: 'City Bank',
      senderAccount: '1234567890',
      amount: 5000,
      trxId: '1111-2222-4444-4444',
      date: '2024-03-26T07:05:48.291+00:00',
      status: 'IN_REVIEW',
    },
    {
      paymentId: '289e3d6e-642d-4541-9b16-e9d8e708812e',
      courseId: '550e8400-e29b-41d4-a716-446655440000',
      userId: '2022569c-8716-4df4-a076-b1238fd7f99d',
      paymentVendor: 'City Bank',
      senderAccount: '1234567890',
      amount: 5000,
      trxId: '1111-2222-3333-5555',
      date: '2024-03-26T07:05:36.098+00:00',
      status: 'APPROVED',
    },
    {
      paymentId: '99481905-091e-4a2d-886e-47fc7128e3f2',
      courseId: '550e8400-e29b-41d4-a716-446655440000',
      userId: '2022569c-8716-4df4-a076-b1238fd7f99d',
      paymentVendor: 'City Bank',
      senderAccount: '1234567890',
      amount: 5000,
      trxId: '1111-2222-3333-4444',
      date: '2024-03-26T07:04:44.052+00:00',
      status: 'IN_REVIEW',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
