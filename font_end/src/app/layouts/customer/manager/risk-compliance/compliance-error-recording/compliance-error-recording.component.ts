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
import { DatePipe } from '@angular/common';
import { BranchInfo, CIFInfo, RetrieveCustomerRefDataMgmtIn, RetrieveCustomerRefDataMgmtOutModel, TransactionInfoIn } from '../Model/retrieve-customer-ref-data-mgmt.model';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-compliance-error-recording',
  templateUrl: './compliance-error-recording.component.html',
  styleUrls: ['./compliance-error-recording.component.css']
})
export class ComplianceErrorRecordingComponent implements OnInit {
  submitted = false;
  data_edit: RiskComplianceModel;
  formRiskCompliance: RiskComplianceModel;
  unit_of_recognition: BranchModel[];
  branch_datas: BranchModel[];
  array_major_data: BusinessSegmentModel[];
  group_major_data: ProfessionalGroupModel;
  group_error_data: GroupErrorModel;
  error_data: DetailErrorModel[] = [];
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
  rs_group_error_data: GroupErrorModel[] = [];
  rs_group_major_data: ProfessionalGroupModel;
  status_corrective_info: StatusModel;

  detail_error: DetailErrorModel;
  error_group: GroupErrorModel;
  professional_group: ProfessionalGroupModel;
  parent: BusinessSegmentModel;
  flag: boolean;
  date: Date;
  default_date: string;
  created_date: Date;
  creat_date: string;
  constructor(
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private _rickComplianceService: RickComplianceService,
    private authenticationService: AuthenticationService,
  ) {
    this.formRiskCompliance = new RiskComplianceModel();
    this.formRiskCompliance.branch = new BranchModel();
    this.formRiskCompliance.document = new DocumentModel();
    this.formRiskCompliance.error_transaction_info = new ErrorTransactionInfoModel();
    //this.formRiskCompliance.error_transaction_info.branch = new BranchModel();
    this.formRiskCompliance.corrective_status = new CorrectiveInfoModel();
    this.formRiskCompliance.corrective_status.status = new StatusModel();
    this.formRiskCompliance.staff = new List<StaffModel>().toArray();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.uploader = new FileUploader({ isHTML5: true });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.response.subscribe(res => this.response = res);
    this.init_data();
    this.date = new Date();
    this.created_date = new Date();
    this.created_date.setDate(this.date.getDate() + 7)
    const datepipe: DatePipe = new DatePipe('en-US')
    this.default_date = datepipe.transform(this.date, 'yyyy-MM-dd')
    this.creat_date = datepipe.transform(this.created_date, 'yyyy-MM-dd')
    this.formRiskCompliance.duration = this.creat_date;
  }

  ngOnInit() {
    const heroForm = new FormGroup({
      'branch': new FormControl(),
      'parent': new FormControl(),
      'professional_group': new FormControl(),
    });
    this.heroForm = new FormGroup({
      branch: new FormControl(this.formRiskCompliance.branch, Validators.required)
    });
  }
  get branch() { return this.heroForm.get('branch'); }
  // async onChangeTransactionAmount(e) {
  //   console.log(e)
  //   this.formRiskCompliance.error_transaction_info.transaction_amount = formatNumber(Number(e), 'en-US', '1.0-0');
  // }
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

  async init_data() {
    this.status = new StatusModel();
    this.status.use_table = "APPROVED";
    var rs_status = await this._rickComplianceService.GetStatus(this.status);

    this.rq_major_data = new BusinessSegmentModel();
    this.rq_major_data.is_actived = 1;
    var rs_branch = await this._rickComplianceService.GetBranch({ flag: '1' } as any);
    var rs_unit_of_recognition = await this._rickComplianceService.GetBranch({ flag: '0' } as any);
    var array_major = await this._rickComplianceService.GetBusinessSegment(this.rq_major_data);

    this.status_corrective_info = new StatusModel();
    this.status_corrective_info.use_table = "CORRECTIVE_INFO";
    var rs_status_corrective_info = await this._rickComplianceService.GetStatus(this.status_corrective_info);
    this.status_corrective_info = rs_status_corrective_info.data.filter(s => s.code == "1" || s.code == "0");
    this.formRiskCompliance.corrective_status.status = rs_status_corrective_info.data.filter(s => s.code == "-1")[0];

    if (rs_unit_of_recognition.code != "200") {
      this.notifierService.error("Thông Báo:", "Lỗi rồi má ơi!");
    }
    else {
      this.unit_of_recognition = rs_unit_of_recognition.data;
      this.branch_datas = rs_branch.data;
      this.array_major_data = array_major.data;
      this.status = rs_status.data;
    }
  }
  async onSelectArrayMajor(event, item) {
    // reset item con
    //this.error_group = new GroupErrorModel();
    //this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.rs_group_error_data = [];
    this.error_data = [];

    //
    this.group_major_data = new ProfessionalGroupModel();
    this.group_major_data.parent = new BusinessSegmentModel();
    this.group_major_data.parent = item;
    this.group_major_data.is_actived = 1;
    const group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data);
    this.rs_group_major_data = group_major.data;
  }
  async onSelectGroupMajor(event, item) {
    // reset data
    //this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.error_data = [];
    //
    this.group_error_data = new GroupErrorModel();
    this.group_error_data.professional_group = new ProfessionalGroupModel();
    this.group_error_data.professional_group = item;
    this.group_error_data.is_actived = 1;
    const group_error = await this._rickComplianceService.getGroupError(this.group_error_data);
    this.rs_group_error_data = group_error.data;
  }
  async onSelectGroupError(event, item) {
    var req_detail_error = new DetailErrorModel();
    req_detail_error.error_group = item;
    req_detail_error.is_actived = 1;
    const error = await this._rickComplianceService.getDetailError(req_detail_error);
    this.error_data = error.data;
  }
  async getHrInfoUser() {
    debugger
    this.flag = false;
    this.staff_dates = new StaffModel;
    this.staff_dates.user_id = this._user;
    var rp_hr_info_user = await this._rickComplianceService.GetHrInfoUser(this.staff_dates);
    this.staff_dates = new StaffModel;
    this.staff_dates = rp_hr_info_user.data;
    this.staff_dates.conduct_transactione = false;
    this.staff_dates.scores = 0;
    this.list_user.forEach(itemFor => {
      if (itemFor.user_code == this.staff_dates.user_code) {
        this.flag = true;
      }
    });
    if (this.list_user.count() > 0) {
      // var index = this.list_user.indexOf(this.staff_dates)
      if (!this.flag) {
        this.list_user.push(this.staff_dates);
        this.formRiskCompliance.staff = this.list_user.toArray();
      }
    }
    else {
      this.list_user.push(this.staff_dates);
      this.formRiskCompliance.staff = this.list_user.toArray();
    }
    // this.user_data = this.list_user.toArray();
  }
  async removeItemUser(itemRemote: StaffModel) {
    this.formRiskCompliance.staff = new List<StaffModel>(this.formRiskCompliance.staff).where(w => w.user_code !== itemRemote.user_code).toArray();
    // this.formRiskCompliance.staff = new List<StaffModel>(data)
    // this.formRiskCompliance.staff = this.formRiskCompliance.staff.filter(s => s.user_code != itemRemote.user_code);
    this.list_user.remove(itemRemote);
  }
  async onSubmit() {
    let check = this.formRiskCompliance.staff.filter(s => s.conduct_transactione == true);
    if (check.length < 1) {
      alert('Phải có ít nhất 1 nhân viên thực hiện giao dịch hồ sơ!');
      return;
    }
    this.submitted = true;
    debugger
    this.formRiskCompliance.noted_staff = this.currentUser;
    if (this.uploader.queue.length > 0) {
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
    }
    var rs_data = await this._rickComplianceService.InsertRickCompliance(this.formRiskCompliance);
    if (rs_data.code == "200") {
      this.notifierService.success("Thông Báo", "Thêm mới thành công!");
      this.onBack();
    } else {
      this.notifierService.error("Thông Báo", "Thêm mới lỗi! ")
    }
  }
  async onBack() {
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/risk-compliance';
    this.router.navigate([this.returnUrl], { queryParams: {} });
  }
}
