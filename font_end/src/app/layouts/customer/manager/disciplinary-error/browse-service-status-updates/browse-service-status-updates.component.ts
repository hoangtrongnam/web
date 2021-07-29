import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NotifierService } from '@/_services';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { DisciplinaryErrorModel } from '../Models/disciplinary-error.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { DetailIssueModel } from '../Models/detail-issue.model';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { AddDisciplinaryStatusComponent, ViewDisciplinaryStatusComponent, ViewIssueCorrectionStatusComponent, ViewNotedErrorHandlingComponent } from '..';
import { DisciplinaryStatusModel } from '../Models/disciplinary-status-model';
import { IssueCorrectionStatusModel } from '../Models/issue-correction-status.model';
import { StatusModel } from '../../risk-compliance/Model/status.model';

@Component({
  selector: 'app-browse-service-status-updates',
  templateUrl: './browse-service-status-updates.component.html',
  styleUrls: ['./browse-service-status-updates.component.css']
})
export class BrowseServiceStatusUpdatesComponent implements OnInit {
  dataTable: DisciplinaryErrorModel[];
  formNotedErrorHandling: DisciplinaryErrorModel;
  submitted: boolean;
  rq_branch: BranchModel;
  list_unit_incurred: BranchModel[]=[];
  allFlag: boolean;
  branch: BranchModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private _disciplineErrorService: DisciplineErrorService,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private orderPipe: OrderPipe
  ) {
    this.submitted = false;
    this.formNotedErrorHandling = new DisciplinaryErrorModel();
    this.formNotedErrorHandling.detail_issue = new DetailIssueModel();
    this.branch = new BranchModel();
    this.branch.id = null;
    this.branch.branch_code = null;
    this.branch.branch_name = "Tất Cả";
    this.branch.flag = null;
    this.branch.is_actived = "1";
    this.formNotedErrorHandling.detail_issue.unit_incurred = this.branch;
  }
  async ngOnInit() {
    this.allFlag = false;
    await this.initData();
  }

  async initData() {
    this.rq_branch = new BranchModel;
    this.rq_branch.flag = "1";
    var unit_incurred = await this._rickComplianceService.GetBranch(this.rq_branch);
    this.list_unit_incurred = unit_incurred.data;
  }
  
  async view(item) {
    const dialogRef = this.dialog.open(ViewIssueCorrectionStatusComponent, {
      width: '1200px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async clickAllChecked() {
    if (this.allFlag == false) {
      this.dataTable.forEach(s => s.issue_correction_status.approved.flag = true);
    }
    else {
      this.dataTable.forEach(s => s.issue_correction_status.approved.flag = false);
    }
  }
  async onSubmitSearch() {
    this.formNotedErrorHandling.issue_correction_status = new IssueCorrectionStatusModel();
    this.formNotedErrorHandling.issue_correction_status.status = new StatusModel();
    this.formNotedErrorHandling.issue_correction_status.status.code = "1";
    this.formNotedErrorHandling.issue_correction_status.approved = new StatusModel();
    this.formNotedErrorHandling.issue_correction_status.approved.code = "0";
    var rs_data = await this._disciplineErrorService.getDisciplinaryError(this.formNotedErrorHandling);
    this.dataTable = rs_data.data;
  }
  async onSave() {
    var rs_data = await this._disciplineErrorService.updateListIssueCorrectionStatus(this.dataTable);
    if (rs_data.code == "200") {
      this.notifierService.success("Thông báo", "Duyệt thành công!");
    }
    else {
      this.notifierService.error("Thông báo", "Duyệt thất bại!");
    }
  }
}
