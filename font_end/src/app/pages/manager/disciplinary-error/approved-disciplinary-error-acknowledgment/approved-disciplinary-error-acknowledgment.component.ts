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
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { DisciplinaryErrorModel } from '../Models/disciplinary-error.model';
import { DetailIssueModel } from '../Models/detail-issue.model';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { ViewNotedErrorHandlingComponent } from '..';
import { DisciplinaryStatusModel } from '../Models/disciplinary-status-model';
import { IssueCorrectionStatusModel } from '../Models/issue-correction-status.model';

@Component({
  selector: 'app-approved-disciplinary-error-acknowledgment',
  templateUrl: './approved-disciplinary-error-acknowledgment.component.html',
  styleUrls: ['./approved-disciplinary-error-acknowledgment.component.css']
})
export class ApprovedDisciplinaryErrorAcknowledgmentComponent implements OnInit {
  formNotedErrorHandling: DisciplinaryErrorModel;
  submitted: boolean;
  status_approved: StatusModel;
  rq_status: StatusModel;
  rq_disciplinary_status: StatusModel;
  list_status_approved: StatusModel[] = [];
  list_disciplinary_status: StatusModel[] = [];
  rq_branch: BranchModel;
  dataTable: DisciplinaryErrorModel[];
  list_unit_incurred: BranchModel[]=[];
  allFlag: boolean;
  branch: any;
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
    this.rq_status = new StatusModel;
    this.rq_status.use_table = "APPROVED";
    this.rq_disciplinary_status = new StatusModel;
    this.rq_disciplinary_status.use_table = "DISCIPLINARY_STATUS";
    this.rq_branch = new BranchModel;
    this.rq_branch.flag = "1";
    var unit_incurred = await this._rickComplianceService.GetBranch(this.rq_branch);
    this.list_unit_incurred = unit_incurred.data;
    var status_approved = await this._rickComplianceService.GetStatus(this.rq_status);
    this.list_status_approved = status_approved.data.filter(s => s.code != "2");
    this.formNotedErrorHandling.approved = status_approved.data.filter(s => s.code == "-1")[0];
    var rs_disciplinary_status = await this._rickComplianceService.GetStatus(this.rq_disciplinary_status);
    this.list_disciplinary_status = rs_disciplinary_status.data.filter(s => s.code == "1");
    this.formNotedErrorHandling.disciplinary_status = rs_disciplinary_status.data.filter(s => s.code == "1")[0];
  }
  async onSubmitSearch() {
    debugger
    this.formNotedErrorHandling.disciplinary_status = new DisciplinaryStatusModel();
    this.formNotedErrorHandling.disciplinary_status.approved = new StatusModel();
    this.formNotedErrorHandling.disciplinary_status.approved.code = "-2";
    this.formNotedErrorHandling.issue_correction_status = new IssueCorrectionStatusModel();
    this.formNotedErrorHandling.issue_correction_status.approved = new StatusModel();
    this.formNotedErrorHandling.issue_correction_status.approved.code = "-2";
    var rs_data = await this._disciplineErrorService.getDisciplinaryError(this.formNotedErrorHandling);
    this.dataTable = rs_data.data;
  }
  async clickAllChecked() {
    if (this.allFlag == false) {
      this.dataTable.forEach(s => s.approved.flag = true);
    }
    else {
      this.dataTable.forEach(s => s.approved.flag = false);
    }
  }
  async view(item) {
    const dialogRef = this.dialog.open(ViewNotedErrorHandlingComponent, {
      width: '1200px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async onSave() {
    var rs_data = await this._disciplineErrorService.updateListDisciplinaryError(this.dataTable);
    if (rs_data.code == "200") {
      this.notifierService.success("Thông báo", "Duyệt thành công!");
    }
    else {
      this.notifierService.error("Thông báo", "Duyệt thất bại!");
    }
  }
}
