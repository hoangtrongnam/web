import { Component, ElementRef, Renderer2, Input, OnInit, OnDestroy, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel, ProfessionalGroupModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { NotificationService } from '@/_components/notification/_services';
import { NotifierService } from '@/_services';
import { DetailErrorModel, GroupErrorModel } from '@/pages/manager/risk-compliance/Model/error.model';
import { DisciplinaryOriginErrorModel } from '@/pages/manager/disciplinary-error/Models/disciplinary-origin-error.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { FormOfDisciplineModel } from '@/pages/manager/disciplinary-error/Models/form-of-discipline.model';
import { DisciplinaryErrorModel } from '../../Models/disciplinary-error.model';
import { StaffModel } from '@/pages/manager/risk-compliance/Model/staff.model';
import { List } from 'linq-typescript';
import { DetailIssueModel } from '../../Models/detail-issue.model';
import { StaffFormOfDisciplineModel } from '../../Models/staff-form-of-discipline.model';
import { BranchInfo, CIFInfo, RetrieveCustomerRefDataMgmtIn, RetrieveCustomerRefDataMgmtOutModel, TransactionInfoIn } from '@/pages/manager/risk-compliance/Model/retrieve-customer-ref-data-mgmt.model';

@Component({
  templateUrl: './edit-noted-error-handling.component.html',
  styleUrls: ['./edit-noted-error-handling.component.css']
})

export class EditNotedErrorHandlingComponent implements OnInit {
  formDisciplinaryError: DisciplinaryErrorModel;  
  heroForm: FormGroup;
  dataEdit: DisciplinaryErrorModel
  _user: StaffModel;
  staffFormOfDiscipline: StaffFormOfDisciplineModel;
  list_staffFormOfDiscipline = new List<StaffFormOfDisciplineModel>();
  flag: boolean;
  list_form_of_discipline = new List<FormOfDisciplineModel>();

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<EditNotedErrorHandlingComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: DisciplinaryErrorModel) {
      this.dataEdit = data;
      this._user = new StaffModel();
      this.formDisciplinaryError = new DisciplinaryErrorModel();
      this.formDisciplinaryError.unit_request = new BranchModel();
      this.formDisciplinaryError = this.dataEdit;
      this.formDisciplinaryError.unit_request = this.dataEdit.unit_request;
      this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.dataEdit.detail_issue.staff_form_of_discipline;
      this.list_staffFormOfDiscipline = new List<StaffFormOfDisciplineModel>(this.formDisciplinaryError.detail_issue.staff_form_of_discipline);
  }
  async ngOnInit() {    
    var rq_form_of_discipline = new FormOfDisciplineModel();
    rq_form_of_discipline.is_actived = 1;
    var FormOfDiscipline = await this._disciplineErrorService.getFormOfDiscipline(rq_form_of_discipline);
    this.list_form_of_discipline = FormOfDiscipline.data;
    const heroForm = new FormGroup({
      'id': new FormControl(),
      'form_of_discipline': new FormControl(),
      'minus_point': new FormControl(),
      'is_actived': new FormControl()
    });
    this.heroForm = new FormGroup({
      // id: new FormControl(this.formDisciplinaryError.id, Validators.required),
      // form_of_discipline: new FormControl(this.formDisciplinaryError.form_of_discipline, Validators.required),
      // minus_point: new FormControl(this.formDisciplinaryError.minus_point, Validators.required),
      // is_actived: new FormControl(this.formDisciplinaryError.is_actived, [Validators.required])
    });
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
    this.formDisciplinaryError.detail_issue.full_name_customer = response.retrievecustomerrefdatamgmt_out.customerinfo.fullname_vn;
  }
  get id() { return this.heroForm.get('id'); }
  get form_of_discipline() { return this.heroForm.get('form_of_discipline'); }
  get minus_point() { return this.heroForm.get('minus_point'); }
  get is_actived() { return this.heroForm.get('is_actived'); }
  onClose(): void {
    this.dialogRef.close();
  }
  async getHrInfoUser() {
    debugger
    this.flag = false;
    var rp_hr_info_user = await this._rickComplianceService.GetHrInfoUser(this._user);
    this.staffFormOfDiscipline = new StaffFormOfDisciplineModel();
    this.staffFormOfDiscipline.staff = rp_hr_info_user.data;
    this.staffFormOfDiscipline.form_of_discipline = new FormOfDisciplineModel();
    this.list_staffFormOfDiscipline.forEach(itemFor => {
      if(itemFor.staff.user_code == this.staffFormOfDiscipline.staff.user_code)
      {
        this.flag = true;
      }
    });
    this.staffFormOfDiscipline
    if (this.list_staffFormOfDiscipline.count() > 0) {
      if (!this.flag) {
        this.list_staffFormOfDiscipline.push(this.staffFormOfDiscipline);
        this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.list_staffFormOfDiscipline.toArray();
      }
    }
    else {
      this.list_staffFormOfDiscipline.push(this.staffFormOfDiscipline);
      this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.list_staffFormOfDiscipline.toArray();
    }
    console.log(this.formDisciplinaryError.detail_issue.staff_form_of_discipline);
  }
  async removeItemUser(itemRemote: StaffFormOfDisciplineModel) {
    this.formDisciplinaryError.detail_issue.staff_form_of_discipline = new List<StaffFormOfDisciplineModel>(this.formDisciplinaryError.detail_issue.staff_form_of_discipline).where(w => w.staff.user_code != itemRemote.staff.user_code).toArray();
    this.list_staffFormOfDiscipline.remove(itemRemote);
  }
  
  async onSave() {
    console.log(this.formDisciplinaryError)
    var res = await this._disciplineErrorService.updateDisciplinaryError(this.formDisciplinaryError);
    if(res.code == "200"){
      this._notifierService.success("Thông Báo","Cập nhật thành công!");
      this.onClose();
    }else{
      this._notifierService.error("Thông Báo","Cập nhật lỗi! ");
    }
  }
}