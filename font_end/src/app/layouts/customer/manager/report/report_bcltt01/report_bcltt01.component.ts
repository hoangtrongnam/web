import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../../risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { MatDialog } from '@angular/material/dialog';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { List } from 'linq-typescript';
import { DetailIssueModel } from '../../disciplinary-error/Models/detail-issue.model';
import { DisciplinaryErrorModel } from '../../disciplinary-error/Models/disciplinary-error.model';
import { IssueCorrectionStatusModel } from '../../disciplinary-error/Models/issue-correction-status.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { DialogComplianceErrorRecordingComponent } from '../../risk-compliance';
import { CorrectiveInfoModel } from '../../risk-compliance/Model/corrective-info.model';
import { DetailErrorModel, GroupErrorModel } from '../../risk-compliance/Model/error.model';
import { RiskComplianceModel } from '../../risk-compliance/Model/risk-compliance.model';
import { RequestReportBCLTT01Model } from '@/_models';

@Component({
  selector: 'app-report_bcltt01',
  templateUrl: './report_bcltt01.component.html',
  styleUrls: ['./report_bcltt01.component.css']
})
export class ReportBCLTT01Component implements OnInit {
  formReport : RequestReportBCLTT01Model;
  array_major_data: BusinessSegmentModel[];
  group_major_data: ProfessionalGroupModel;
  status: StatusModel;
  status_corrective_info: StatusModel;
  dataTable: RiskComplianceModel[];
  rq_major_data: BusinessSegmentModel;
  returnUrl: any;
  rs_group_major_data: ProfessionalGroupModel;
  list_unit_incurred: List<BranchModel>;
  branch: BranchModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private notifierService: NotifierService,
    private http: HttpClient,
  ) {
    this.formReport = new RequestReportBCLTT01Model();
    this.formReport.statusApproved = new StatusModel();
    this.formReport.correctiveStatus = new StatusModel();
    this.formReport.professionalGroup = new ProfessionalGroupModel();
    this.formReport.branch = new BranchModel();
    this.branch = new BranchModel();
    this.branch.id = null;
    this.branch.branch_code = null;
    this.branch.branch_name = "Tất Cả";
    this.branch.flag = null;
    this.branch.is_actived = "1";
    this.formReport.branch = this.branch;
  }

  async ngOnInit() {
    await this.initData();
  }
  async initData() {
    this.status = new StatusModel();
    this.status.use_table = "APPROVED";
    this.group_major_data = new ProfessionalGroupModel();
    this.rq_major_data = new BusinessSegmentModel();
    this.status_corrective_info = new StatusModel();
    this.status_corrective_info.use_table = "CORRECTIVE_INFO";
    // this.rq_major_data.parent_id = "1";
    var array_major = await this._rickComplianceService.GetBusinessSegment(this.rq_major_data);
    this.array_major_data = array_major.data;

    var rs_status = await this._rickComplianceService.GetStatus(this.status);
    this.status = rs_status.data.filter(s => s.code == "1");
    this.formReport.statusApproved = rs_status.data.filter(s => s.code == "1")[0];

    var rs_status_corrective_info = await this._rickComplianceService.GetStatus(this.status_corrective_info);
    this.status_corrective_info = rs_status_corrective_info.data;//.filter(s => s.code != "-1");
    this.formReport.correctiveStatus = rs_status_corrective_info.data.filter(s => s.code == "-1")[0];

    
    var rq_unit_incurred = new BranchModel();
    rq_unit_incurred.flag = "1";
    var unit_incurred = await this._rickComplianceService.GetBranch(rq_unit_incurred);
    this.list_unit_incurred = unit_incurred.data;  
  }
  async onSelectArrayMajor(event, item) {
    this.group_major_data = new ProfessionalGroupModel();
    this.group_major_data.parent = new BusinessSegmentModel();
    this.group_major_data.parent = item;
    this.group_major_data.is_actived = 1;
    const group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data);
    this.rs_group_major_data = group_major.data;
    this.formReport.professionalGroup.parent = item;
  }
  
  async ExportBCLTT01(){
    debugger
    // this.loading = true;
    return this.http.post(`${environment.apiUrl}/report/report_bcltt01`, this.formReport, { responseType: 'blob' })
    .subscribe((result: Blob) => {
          // this.loading = false;
          var blob = new Blob([result]);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          const currentTime = new Date();
          var filename = "BCLTT01_" + currentTime
              .getFullYear().toString() + (currentTime
                  .getMonth() + 1) + currentTime
                      .getDate() + currentTime
                          .toLocaleTimeString()
                          .replace(/[ ]|[,]|[:]/g, '')
                          .trim() + ".xlsx";
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          this.notifierService.success('Thông báo', 'Xuất file excel thành công!');
      });
  }
  get diagnostic() { return JSON.stringify(this.formReport); }
}
