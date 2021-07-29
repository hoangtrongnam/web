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
import { FileUploader } from 'ng2-file-upload';
import { StatusModel } from '@/pages/manager/risk-compliance/Model/status.model';

@Component({
  templateUrl: './add-issue-correction-status.component.html',
  styleUrls: ['./add-issue-correction-status.component.css']
})

export class AddIssueCorrectionStatusComponent implements OnInit {
  formDisciplinaryError: DisciplinaryErrorModel;
  heroForm: FormGroup;
  dataEdit: DisciplinaryErrorModel
  _user: StaffModel;
  staffFormOfDiscipline: StaffFormOfDisciplineModel;
  list_staffFormOfDiscipline: StaffFormOfDisciplineModel[] = [];
  flag: boolean;
  list_form_of_discipline = new List<FormOfDisciplineModel>();
  uploader: FileUploader;
  response: any;
  status: StatusModel;
  list_status: StatusModel[] = [];

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService: NotifierService,
    public dialogRef: MatDialogRef<AddIssueCorrectionStatusComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: DisciplinaryErrorModel) {
    debugger
    this.dataEdit = data;
    this._user = new StaffModel();
    this.formDisciplinaryError = new DisciplinaryErrorModel();
    this.formDisciplinaryError.unit_request = new BranchModel();
    this.formDisciplinaryError = this.dataEdit;
    this.formDisciplinaryError.unit_request = this.dataEdit.unit_request;
    this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.dataEdit.detail_issue.staff_form_of_discipline;
    this.list_staffFormOfDiscipline = this.formDisciplinaryError.detail_issue.staff_form_of_discipline;
    this.uploader = new FileUploader({ isHTML5: true });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.response.subscribe(res => this.response = res);

  }
  async ngOnInit() {

    this.status = new StatusModel();
    this.status.use_table = "REPAIR_STATUS";
    var rs_status = await this._rickComplianceService.GetStatus(this.status);
    var data = rs_status.data.filter(s => s.code != "-1");
    this.list_status = data;
    this.formDisciplinaryError.issue_correction_status.status = data.filter(s => s.code == "1")[0];


    var FormOfDiscipline = await this._disciplineErrorService.getFormOfDiscipline();
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
    this.list_staffFormOfDiscipline.forEach(itemFor => {
      if (itemFor.staff.user_code == this.staffFormOfDiscipline.staff.user_code) {
        this.flag = true;
      }
    });
    if (this.list_staffFormOfDiscipline.length > 0) {
      if (!this.flag) {
        this.list_staffFormOfDiscipline.push(this.staffFormOfDiscipline);
        this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.list_staffFormOfDiscipline;
      }
    }
    else {
      this.list_staffFormOfDiscipline.push(this.staffFormOfDiscipline);
      this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.list_staffFormOfDiscipline;
    }
  }
  async removeItemUser(itemRemote: StaffFormOfDisciplineModel) {
    debugger
    this.formDisciplinaryError.detail_issue = new DetailIssueModel();
    this.formDisciplinaryError.detail_issue.staff_form_of_discipline = new List<StaffFormOfDisciplineModel>(this.formDisciplinaryError.detail_issue.staff_form_of_discipline).where(w => w.staff.user_code !== itemRemote.staff.user_code).toArray();
    // this.list_user.remove(itemRemote);
  }
  async UploadFile() {
    if (this.uploader.queue.length < 1) {
      alert('Chưa Tải file đính kèm');
      return;
    }
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
    this.formDisciplinaryError.issue_correction_status.file_name = rs.data.file_name;
    this.formDisciplinaryError.issue_correction_status.file_type = rs.data.file_type;
    this.formDisciplinaryError.issue_correction_status.file_contents = rs.data.file_contents;
  }

  async onSave() {
    // await this.UploadFile();
    // console.log(this.formDisciplinaryError)
    var res = await this._disciplineErrorService.updateDisciplinaryError(this.formDisciplinaryError);
    if (res.code == "200") {
      this._notifierService.success("Thông Báo", "Cập nhật thành công!");
      this.onClose();
    } else {
      this._notifierService.error("Thông Báo", "Cập nhật lỗi! ");
    }
  }
}