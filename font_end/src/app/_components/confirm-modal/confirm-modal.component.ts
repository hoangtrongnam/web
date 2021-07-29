import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ConfirmModalService } from './_services';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  private subscription: Subscription;
  confirmModal: any;

  constructor(
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.subscription = this.confirmModalService.onConfirmModal().subscribe(modal => {
      this.confirmModal = modal;
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
