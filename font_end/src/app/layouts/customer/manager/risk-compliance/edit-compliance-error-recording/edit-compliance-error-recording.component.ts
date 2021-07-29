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
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
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
import { RetrieveCustomerRefDataMgmtIn, TransactionInfoIn, CIFInfo, BranchInfo, RetrieveCustomerRefDataMgmtOutModel } from '../Model/retrieve-customer-ref-data-mgmt.model';

@Component({
  selector: 'app-edit-compliance-error-recording',
  templateUrl: './edit-compliance-error-recording.component.html',
  styleUrls: ['./edit-compliance-error-recording.component.css']
})
export class EditComplianceErrorRecordingComponent implements OnInit {
  data_edit: RiskComplianceModel;
  formRiskCompliance : RiskComplianceModel;
  unit_of_recognition: BranchModel[];
  branch_datas: BranchModel[];
  array_major_data: BusinessSegmentModel[];
  group_major_data: ProfessionalGroupModel;
  group_error_data: GroupErrorModel[] = [];
  staff_dates: StaffModel;
  status: StatusModel;
  _user: string;
  list_user = new List<StaffModel>();
  currentUser: any;
  uploader: FileUploader;
  response: any;
  rq_major_data: BusinessSegmentModel;
  returnUrl: any;
  heroForm: FormGroup;
  request: RiskComplianceModel[] = [];
  error_data: DetailErrorModel[] = [];

  error_group: GroupErrorModel;
  professional_group: ProfessionalGroupModel;
  parent: BusinessSegmentModel;
  flag: boolean;

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
    this.formRiskCompliance.document.release_date = this.data_edit.document.release_date;
    this.data_edit.created_date = this.data_edit.created_date;//.slice(0, 10);
    this.data_edit.duration = this.data_edit.duration;//.slice(0, 10);

    this.error_group = this.formRiskCompliance.detail_error.error_group;
    this.professional_group = this.formRiskCompliance.detail_error.error_group.professional_group;
    this.parent = this.formRiskCompliance.detail_error.error_group.professional_group.parent;

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.uploader = new FileUploader({ isHTML5: true });
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.response.subscribe(res => this.response = res);
    this.init_data();
  }

  ngOnInit() {
    const heroForm = new FormGroup({
      'code': new FormControl(),
      'branch': new FormControl(),
    });
    this.heroForm = new FormGroup({
      code: new FormControl(this.formRiskCompliance.code, Validators.required),
      branch: new FormControl(this.formRiskCompliance.branch, Validators.required),
    });
  }
  async init_data() {
    this.status = new StatusModel();
    this.rq_major_data = new BusinessSegmentModel();
    this.group_major_data = new ProfessionalGroupModel();
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
  async onRetrieveCustomerRefDataMgmt(cIFNum) {
    // reset item con
    var request = new RetrieveCustomerRefDataMgmtIn();
    request.transactioninfo = new TransactionInfoIn();
    request.cifinfo = new CIFInfo();
    request.transactioninfo.branchinfo = new BranchInfo();
    request.transactioninfo.clientcode = "DVKH";
    request.transactioninfo.crefnum = "231212413412";
    request.transactioninfo.branchinfo.branchcode = "000";
    request.cifinfo.cifnum = cIFNum;
    var response = new RetrieveCustomerRefDataMgmtOutModel();
    var group_major = await this._rickComplianceService.getRetrieveCustomerRefDataMgmt(request);
    response = group_major.data;
    this.formRiskCompliance.error_transaction_info.cif_custom_name = response.retrievecustomerrefdatamgmt_out.customerinfo.fullname_vn;
  }
  get code() { return this.heroForm.get('code'); }
  get branch() { return this.heroForm.get('branch'); }
  async onSelectArrayMajor(event, item) {
    // reset item con
    this.error_group = new GroupErrorModel();
    this.group_error_data = [];
    this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.error_data = [];

    //
    this.group_major_data = new ProfessionalGroupModel();
    this.group_major_data.parent = new BusinessSegmentModel();
    this.group_major_data.parent = item;
    const group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data); 
    this.group_major_data = group_major.data;
  }
  async onSelectGroupMajor(event, item) {
    // reset data
    this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.error_data = [];
    //
    var req_group_error = new GroupErrorModel;
    req_group_error.professional_group = item;
    const group_error = await this._rickComplianceService.getGroupError(req_group_error); 
    this.group_error_data = group_error.data;
  }
  async onSelectGroupError(event, item) {
    var req_detail_error = new DetailErrorModel();
    req_detail_error.error_group = item;
    const error = await this._rickComplianceService.getDetailError(req_detail_error); 
    this.error_data = error.data;
  }
  // async onSelectArrayMajor(event, id) {
  //   this.group_major_data.parent.id = id;
  //   var group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data)
  //   this.group_major_data = group_major.data;
  //   this.error_group = new GroupErrorModel();
  //   this.formRiskCompliance.detail_error = new DetailErrorModel();
  //   // reset cấp con
  //   // this.formRiskCompliance.detail_error.error_group.professional_group = null;//new ProfessionalGroupModel();
  //   // this.formRiskCompliance.detail_error.error_group = null;//new GroupErrorModel();
  //   // this.formRiskCompliance.detail_error = null;//new DetailErrorModel();
  // }
  // async onSelectGroupMajor(event, id) {
  //   this.group_error_data.professional_group.id = id;
  //   var group_error = await this._rickComplianceService.getGroupError(this.group_error_data)
  //   this.group_error_data = group_error.data;
  //   this.formRiskCompliance.detail_error = new DetailErrorModel();
  // }
  // async onSelectGroupError(event, id) {
  //   this.error_data.error_group.id = id;
  //   var error = await this._rickComplianceService.getDetailError(this.error_data)
  //   this.error_data = error.data;
  // }
  async getHrInfoUser() {
    this.staff_dates = new StaffModel;
    this.staff_dates.user_id = this._user;
    var rp_hr_info_user = await this._rickComplianceService.GetHrInfoUser(this.staff_dates);
    this.staff_dates = new StaffModel;
    this.staff_dates = rp_hr_info_user.data;
    this.staff_dates.conduct_transactione = false;
    this.staff_dates.scores = 0;
    // this.staff_dates.conduct_transactione = false;
    // this.list_user.push(this.staff_dates);

    // this.formRiskCompliance.staff = this.list_user.toArray();  
    this.list_user.forEach(itemFor => {
      if(itemFor.user_code == this.staff_dates.user_code)
      {
        this.flag = true;
      }
    });
    if (this.list_user.count() > 0) {
      if (!this.flag) {
        this.list_user.push(this.staff_dates);
        this.formRiskCompliance.staff = this.list_user.toArray();
      }
    }
    else {
      this.list_user.push(this.staff_dates);
      this.formRiskCompliance.staff = this.list_user.toArray();
    }
  }
  async UploadFile()
  {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert('Each File should be less than 10 MB of size.');
        return;
      }
    }
    const form_data = new FormData();
    var count = this.uploader.queue.length - 1;
    const fileItem = this.uploader.queue[count]._file;
    form_data.append('file', fileItem);
    form_data.append('fileSeq', 'seq' + count);
    form_data.append('dataType', fileItem.type);
    var rs = await this._rickComplianceService.UploadFileRiskCompliance(form_data);
    this.formRiskCompliance.corrective_status.file_name = rs.data.file_name;
    this.formRiskCompliance.corrective_status.file_type = rs.data.file_type;
    this.formRiskCompliance.corrective_status.file_contents = rs.data.file_contents;
  }
  async onSubmit() {
    this.request.push(this.formRiskCompliance);
    var rs_data = await this._rickComplianceService.UploadRickCompliance(this.request);
    if(rs_data.code == "200"){
      this.notifierService.success("Thông Báo","Cập Nhật thành công!");
    }else{
      this.notifierService.error("Thông Báo","Cập Nhât lỗi! ")
    }
  }
  async onBack(item) {
    localStorage.setItem('item', JSON.stringify(item));
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/risk-compliance';
    this.router.navigate([this.returnUrl], { queryParams: {} });
  }
  // get diagnostic() { return JSON.stringify(this.formRiskCompliance); }
}
