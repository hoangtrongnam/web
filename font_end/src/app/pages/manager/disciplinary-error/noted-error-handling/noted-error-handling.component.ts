import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CategoryService, NotifierService } from '@/_services';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { DisciplinaryErrorModel } from '../Models/disciplinary-error.model';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { List } from 'linq-typescript';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { DisciplinaryOriginErrorModel } from '../Models/disciplinary-origin-error.model';
import { StaffModel } from '../../risk-compliance/Model/staff.model';
import { DetailIssueModel } from '../Models/detail-issue.model';
import { FormOfDisciplineModel } from '../Models/form-of-discipline.model';
import { StaffFormOfDisciplineModel } from '../Models/staff-form-of-discipline.model';
import { DatePipe } from '@angular/common';
import { RetrieveCustomerRefDataMgmtIn, TransactionInfoIn, CIFInfo, BranchInfo, RetrieveCustomerRefDataMgmtOutModel } from '../../risk-compliance/Model/retrieve-customer-ref-data-mgmt.model';

@Component({
  selector: 'app-noted-error-handling',
  templateUrl: './noted-error-handling.component.html',
  styleUrls: ['./noted-error-handling.component.css']
})
export class NotedErrorHandlingComponent implements OnInit {
  data;
  formNotedErrorHandling: DisciplinaryErrorModel;
  list_unit_request : List<BranchModel>;
  list_error: List<DisciplinaryOriginErrorModel>;
  list_unit_incurred: List<BranchModel>;
  staffFormOfDiscipline: StaffFormOfDisciplineModel;
  list_staffFormOfDiscipline = new List<StaffFormOfDisciplineModel>();//[] = [];
  flag: boolean;
  _user: StaffModel;
  list_form_of_discipline = new List<FormOfDisciplineModel>();
  submitted: boolean;
  returnUrl: any;
  date: Date;
  default_date: string;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private _disciplineErrorService: DisciplineErrorService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private orderPipe: OrderPipe
  ) {
    this.submitted = false;
    this.formNotedErrorHandling = new DisciplinaryErrorModel();
    this.formNotedErrorHandling.detail_issue = new DetailIssueModel();
    this._user = new StaffModel();
  }

  ngOnInit() {
    this.initData();
  }

  async initData() {
    var rq_unit_request = new BranchModel();
    var rq_unit_incurred = new BranchModel();
    rq_unit_request.flag = "2";
    rq_unit_incurred.flag = "1";
    var rq_form_of_discipline = new FormOfDisciplineModel();
    rq_form_of_discipline.is_actived = 1;
    var unit_requests = await this._rickComplianceService.GetBranch(rq_unit_request);
    var error = await this._disciplineErrorService.getDisciplinaryOriginError();
    var unit_incurred = await this._rickComplianceService.GetBranch(rq_unit_incurred);
    var FormOfDiscipline = await this._disciplineErrorService.getFormOfDiscipline(rq_form_of_discipline);
    this.list_unit_request = unit_requests.data;
    this.list_error = error.data;
    this.list_unit_incurred = unit_incurred.data;
    this.list_form_of_discipline = FormOfDiscipline.data;
    
    this.date = new Date();
    const datepipe: DatePipe = new DatePipe('en-US')
    this.default_date = datepipe.transform(this.date, 'yyyy-MM-dd hh:mm:ss')
    this.formNotedErrorHandling.date_of_record = this.date.toISOString().substring(0,10);
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
    debugger
    this.formNotedErrorHandling.detail_issue.full_name_customer = response.retrievecustomerrefdatamgmt_out.customerinfo.fullname_vn;
  }
  async getHrInfoUser() {
    debugger
    this.flag = false;
    var rp_hr_info_user = await this._rickComplianceService.GetHrInfoUser(this._user);
    this.staffFormOfDiscipline = new StaffFormOfDisciplineModel();
    this.staffFormOfDiscipline.staff = rp_hr_info_user.data;
    this.list_staffFormOfDiscipline.forEach(itemFor => {
      if(itemFor.staff.user_code == this.staffFormOfDiscipline.staff.user_code)
      {
        this.flag = true;
      }
    });
    if (this.list_staffFormOfDiscipline.count() > 0) {
      if (!this.flag) {
        this.list_staffFormOfDiscipline.push(this.staffFormOfDiscipline);
        this.formNotedErrorHandling.detail_issue.staff_form_of_discipline = this.list_staffFormOfDiscipline.toArray();
      }
    }
    else {
      this.list_staffFormOfDiscipline.push(this.staffFormOfDiscipline);
      this.formNotedErrorHandling.detail_issue.staff_form_of_discipline = this.list_staffFormOfDiscipline.toArray();
    }
  }
  async removeItemUser(itemRemote: StaffFormOfDisciplineModel) {
    this.formNotedErrorHandling.detail_issue.staff_form_of_discipline = new List<StaffFormOfDisciplineModel>(this.formNotedErrorHandling.detail_issue.staff_form_of_discipline).where(w => w.staff.user_code != itemRemote.staff.user_code).toArray();
    // this.formRiskCompliance.staff = new List<StaffModel>(data)
    // this.formRiskCompliance.staff = this.formRiskCompliance.staff.filter(s => s.user_code != itemRemote.user_code);
    this.list_staffFormOfDiscipline.remove(itemRemote)//.filter(s => s.staff.user_code != itemRemote.staff.user_code);
  }
  async onSubmit() {
    this.submitted = true;
    console.log(this.formNotedErrorHandling)
   var rs_data = await this._disciplineErrorService.insertDisciplinaryError(this.formNotedErrorHandling);
    if (rs_data.code == "200") {
      this.notifierService.success("Thông Báo", "Thêm mới thành công!");
      this.onBack();
    } else {
      this.notifierService.error("Thông Báo", "Thêm mới lỗi! ")
    }
  }
  async onBack() {
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/seek-disciplinary-error';
    this.router.navigate([this.returnUrl], { queryParams: {} });
  }
}
