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
import { CorrectiveInfoModel } from '../../risk-compliance/Model/corrective-info.model';
import { DetailErrorModel, GroupErrorModel } from '../../risk-compliance/Model/error.model';
import { RiskComplianceModel } from '../../risk-compliance/Model/risk-compliance.model';
import { RequestReportBCLTTModel } from '@/_models';

@Component({
  selector: 'app-report_bcltt02',
  templateUrl: './report_bcltt02.component.html',
  styleUrls: ['./report_bcltt02.component.css']
})
export class ReportBCLTT02Component implements OnInit {
  list_unit_incurred: List<BranchModel>;
  formReport: RequestReportBCLTTModel;
  returnUrl: any;
  branch: BranchModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private notifierService: NotifierService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.formReport = new RequestReportBCLTTModel();
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
    var rq_unit_incurred = new BranchModel();
    rq_unit_incurred.flag = "1";
    var unit_incurred = await this._rickComplianceService.GetBranch(rq_unit_incurred);
    this.list_unit_incurred = unit_incurred.data;    
  }
  
  async viewRickCompliance(item) {
    localStorage.setItem('item', JSON.stringify(item));
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/view-compliance-error-recording';
    this.router.navigate([this.returnUrl], { queryParams: { } });
  }
  
  async ExportBCLTT02(){
    debugger
    // this.loading = true;
    return this.http.post(`${environment.apiUrl}/report/report_bcltt02`, this.formReport, { responseType: 'blob' })
    .subscribe((result: Blob) => {
          // this.loading = false;
          var blob = new Blob([result]);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          const currentTime = new Date();
          var filename = "BCLTT02_" + currentTime
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
