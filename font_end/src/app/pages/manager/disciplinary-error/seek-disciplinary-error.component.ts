import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from '@/_services';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { DisciplinaryErrorModel } from './Models/disciplinary-error.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { MatDialog } from '@angular/material/dialog';
import { AddIssueCorrectionStatusComponent, EditNotedErrorHandlingComponent, ViewNotedErrorHandlingComponent } from '.';
import { List } from 'linq-typescript';
import { BranchModel } from '../risk-compliance/Model/branch.model';
import { DetailIssueModel } from './Models/detail-issue.model';
import { StatusModel } from '../risk-compliance/Model/status.model';
import { IssueCorrectionStatusModel } from './Models/issue-correction-status.model';
import { AddDisciplinaryStatusComponent } from './dialog/add_disciplinary_status/add-disciplinary-status.component';
import { DisciplinaryStatusModel } from './Models/disciplinary-status-model';

@Component({
  templateUrl: './seek-disciplinary-error.component.html',
  styleUrls: ['./seek-disciplinary-error.component.css']
})
export class SeekDisciplinaryErrorComponent implements OnInit {
  returnUrl: any;
  dataTable: DisciplinaryErrorModel[];
  formSeekDisciplinaryError: DisciplinaryErrorModel;
  list_unit_incurred: List<BranchModel>;
  status_approved: StatusModel;
  issue_correction_status: StatusModel;
  branch: BranchModel;
  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private notifierService: NotifierService,
    private _rickComplianceService: RickComplianceService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.formSeekDisciplinaryError = new DisciplinaryErrorModel();
    this.formSeekDisciplinaryError.detail_issue = new DetailIssueModel();
    this.formSeekDisciplinaryError.issue_correction_status = new IssueCorrectionStatusModel();
    this.formSeekDisciplinaryError.issue_correction_status.status = new StatusModel();
    this.branch = new BranchModel();
    this.branch.id = null;
    this.branch.branch_code = null;
    this.branch.branch_name = "Tất Cả";
    this.branch.flag = null;
    this.branch.is_actived = "1";
    this.formSeekDisciplinaryError.detail_issue.unit_incurred = this.branch;
  }

  async ngOnInit() {
    await this.initData();
  }
  async initData() {
    this.status_approved = new StatusModel();
    this.status_approved.use_table = "APPROVED";
    var rs_status = await this._rickComplianceService.GetStatus(this.status_approved);
    this.status_approved = rs_status.data.filter(s => s.code != "2");
    this.formSeekDisciplinaryError.approved = rs_status.data.filter(s => s.code == "-1")[0];

    this.issue_correction_status = new StatusModel();
    this.issue_correction_status.use_table = "REPAIR_STATUS";
    var rs_issue_correction_status = await this._rickComplianceService.GetStatus(this.issue_correction_status);
    this.issue_correction_status = rs_issue_correction_status.data;//.filter(s => s.code != "-1");
    this.formSeekDisciplinaryError.issue_correction_status.status = rs_issue_correction_status.data.filter(s => s.code == "-1")[0];


    var rq_unit_incurred = new BranchModel();
    rq_unit_incurred.flag = "1";
    var unit_incurred = await this._rickComplianceService.GetBranch(rq_unit_incurred);
    this.list_unit_incurred = unit_incurred.data;    
  }
  async onSubmitSearch() {
    var rs_data = await this._disciplineErrorService.getDisciplinaryError(this.formSeekDisciplinaryError);
    this.dataTable = rs_data.data;
  }
  // async onSave() {
  //   console.log(this.dataTable)
  //   var rs_data = await this._disciplineErrorService.UploadRickCompliance(this.dataTable);
  //   if (rs_data.code == "200") {
  //     this.notifierService.success("Thông báo", "Duyệt thành công!");
  //   }
  //   else {
  //     this.notifierService.error("Thông báo", "Duyệt thất bại!");
  //   }
  // }
  
  async add() {
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/noted-error-handling';
    this.router.navigate([this.returnUrl], { queryParams: { } });
  }
  async edit(item) {
    const dialogRef = this.dialog.open(EditNotedErrorHandlingComponent, {
      width: '1200px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
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
  async onRemove(item)
  {
    var response = await this._disciplineErrorService.deletedDisciplinaryError(item);
    if (response.code == "200") {
      this.notifierService.success("Thông báo", "Xóa thành công!");
      this.onSubmitSearch();
    }
    else {
      this.notifierService.error("Thông báo", "Xóa thất bại!");
    }
  }
  async AddDisciplinaryStatus(item)
  {
    const dialogRef = this.dialog.open(AddDisciplinaryStatusComponent, {
      width: '1200px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async AddIssueCorrectionStatus(item)
  {
    const dialogRef = this.dialog.open(AddIssueCorrectionStatusComponent, {
      width: '1200px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  get diagnostic() { return JSON.stringify(this.formSeekDisciplinaryError); }
}
