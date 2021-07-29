import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthenticationService, CategoryService, NotifierService } from '@/_services';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { FormRiskComplianceModel, RiskComplianceModel } from '../Model/risk-compliance.model';
import { FormGroupDirective } from '@angular/forms';
import { data } from 'jquery';
import { BranchModel } from '../Model/branch.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../Model/major.model';
import { StaffModel } from '../Model/staff.model';
import { List } from 'linq-typescript';
import { CorrectiveInfoModel, FormCorrectiveInfoModel } from '../Model/corrective-info.model';
import { StatusModel } from '../Model/status.model';
import { DocumentModel } from '../Model/document.model';
import { ErrorTransactionInfoModel, FormErrorTransactionInfoModel } from '../Model/error-transaction-info.model';
import { FileUploader } from 'ng2-file-upload';
import { DetailErrorModel, GroupErrorModel } from '../Model/error.model';

@Component({
  selector: 'app-view-compliance-error-recording',
  templateUrl: './view-compliance-error-recording.component.html',
  styleUrls: ['./view-compliance-error-recording.component.css']
})
export class ViewComplianceErrorRecordingComponent implements OnInit {
  data_edit: RiskComplianceModel;
  formRiskCompliance : RiskComplianceModel;
  unit_of_recognition: BranchModel[];
  branch_datas: BranchModel[];
  array_major_data: BusinessSegmentModel[];
  group_major_data: ProfessionalGroupModel;
  group_error_data: GroupErrorModel;
  error_data: DetailErrorModel;
  staff_dates: StaffModel;
  status: StatusModel;
  _user: string;
  list_user = new List<StaffModel>();
  currentUser: any;
  uploader: FileUploader;
  response: any;
  rq_major_data: BusinessSegmentModel;
  returnUrl: any;
  request: RiskComplianceModel[] = [];

  error_group: GroupErrorModel;
  professional_group: ProfessionalGroupModel;
  parent: BusinessSegmentModel;

  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private _rickComplianceService: RickComplianceService,
    private authenticationService: AuthenticationService,
  ) {
    this.data_edit = JSON.parse(localStorage.getItem("item"));

    this.formRiskCompliance = new RiskComplianceModel();
    this.formRiskCompliance.branch = new BranchModel();
    this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.formRiskCompliance.detail_error.error_group = new GroupErrorModel();
    this.formRiskCompliance.detail_error.error_group.professional_group = new ProfessionalGroupModel();
    this.formRiskCompliance.detail_error.error_group.professional_group.parent = new BusinessSegmentModel();

    this.formRiskCompliance = this.data_edit;
    this.formRiskCompliance.branch = this.data_edit.branch;
    debugger
    this.formRiskCompliance.document.release_date = this.data_edit.document.release_date;
    this.data_edit.created_date = this.data_edit.created_date;//.slice(0, 10);
    this.data_edit.duration = this.data_edit.duration;//.slice(0, 10);

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.uploader = new FileUploader({ isHTML5: true });
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.response.subscribe(res => this.response = res);
    this.init_data();
  }

  ngOnInit() {
  }
  async init_data() {
    this.status = new StatusModel();
    this.rq_major_data = new BusinessSegmentModel();
    this.group_major_data = new ProfessionalGroupModel();
    this.group_error_data = new GroupErrorModel();
    this.error_data = new DetailErrorModel();
    // this.rq_major_data.parent_id = "1";
    this.status.use_table = "CORRECTIVE_INFO";
    var rs_branch = await this._rickComplianceService.GetBranch({flag : '1'} as any);
    var rs_unit_of_recognition = await this._rickComplianceService.GetBranch({flag : '0'} as any);
    var array_major = await this._rickComplianceService.GetBusinessSegment(this.rq_major_data);
    var rs_status = await this._rickComplianceService.GetStatus(this.status);

    if(rs_unit_of_recognition.code != "200")
    {
      this.notifierService.error("Thông Báo:","Lỗi rồi má ơi!");
    }
    else{
      this.unit_of_recognition = rs_unit_of_recognition.data.filter(i => i.id != this.data_edit.branch.id);
      this.branch_datas = rs_branch.data.filter(i => i.id != this.data_edit.error_transaction_info.branch.id);
      this.array_major_data = array_major.data.filter(i => i.id != this.data_edit.detail_error.error_group.professional_group.parent.id);
      this.status = rs_status.data.filter(i => i.id != this.data_edit.corrective_status.id);
    }
  }
  
  async onSelectArrayMajor(event, id) {
    this.group_major_data.parent.id = id;
    var group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data)
    this.group_major_data = group_major.data;
  }
  async onSelectGroupMajor(event, id) {
    this.group_error_data.professional_group.id = id;
    var group_error = await this._rickComplianceService.getGroupError(this.group_error_data)
    this.group_error_data = group_error.data;
  }
  async onSelectGroupError(event, id) {
    this.error_data.error_group.id = id;
    var error = await this._rickComplianceService.getDetailError(this.error_data)
    this.error_data = error.data;
  }
  async onBack(item) {
    localStorage.setItem('item', JSON.stringify(item));
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/risk-compliance';
    this.router.navigate([this.returnUrl], { queryParams: {} });
  }
}
