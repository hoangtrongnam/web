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
import { DisciplinaryStatusModel } from '../../Models/disciplinary-status-model';
import { DocumentModel } from '@/pages/manager/risk-compliance/Model/document.model';
import { StatusModel } from '@/pages/manager/risk-compliance/Model/status.model';
import { IssueCorrectionStatusModel } from '../../Models/issue-correction-status.model';
import { DetailIssueModel } from '../../Models/detail-issue.model';

@Component({
  templateUrl: './view-noted-error-handling.component.html',
  styleUrls: ['./view-noted-error-handling.component.css']
})

export class ViewNotedErrorHandlingComponent implements OnInit {
  formDisciplinaryError: DisciplinaryErrorModel;
  heroForm: FormGroup;
  dataEdit: DisciplinaryErrorModel
  _user: StaffModel;

  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService: NotifierService,
    public dialogRef: MatDialogRef<ViewNotedErrorHandlingComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: DisciplinaryErrorModel) {
    this.dataEdit = data;
    this._user = new StaffModel();
    this.formDisciplinaryError = new DisciplinaryErrorModel();
    this.formDisciplinaryError.unit_request = new BranchModel();
    this.formDisciplinaryError.detail_issue = new DetailIssueModel();

    this.formDisciplinaryError = this.dataEdit;
    this.formDisciplinaryError.unit_request = this.dataEdit.unit_request;
    this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.dataEdit.detail_issue.staff_form_of_discipline;
    debugger
    if (this.formDisciplinaryError.disciplinary_status.id == null || this.formDisciplinaryError.disciplinary_status.id == "") {
      this.formDisciplinaryError.disciplinary_status = new DisciplinaryStatusModel();
      this.formDisciplinaryError.disciplinary_status.document = new DocumentModel();
      this.formDisciplinaryError.disciplinary_status.status = new StatusModel();
      this.formDisciplinaryError.disciplinary_status.note = this.formDisciplinaryError.disciplinary_status == null ? "" : this.formDisciplinaryError.disciplinary_status.note;
      this.formDisciplinaryError.disciplinary_status.status.contents = this.formDisciplinaryError.disciplinary_status == null ? "" : this.formDisciplinaryError.disciplinary_status.status == null ? "" : this.formDisciplinaryError.disciplinary_status.status.contents == null ? "" : this.formDisciplinaryError.disciplinary_status.status.contents;
      this.formDisciplinaryError.disciplinary_status.document.code = this.formDisciplinaryError.disciplinary_status == null ? "" : this.formDisciplinaryError.disciplinary_status.document == null ? "" : this.formDisciplinaryError.disciplinary_status.document.code;
      this.formDisciplinaryError.disciplinary_status.document.issuing_unit = this.formDisciplinaryError.disciplinary_status == null ? "" : this.formDisciplinaryError.disciplinary_status.document == null ? "" : this.formDisciplinaryError.disciplinary_status.document.issuing_unit;
      //this.formDisciplinaryError.disciplinary_status.document.release_date = this.formDisciplinaryError.disciplinary_status == null ? Date : this.formDisciplinaryError.disciplinary_status.document == null ? Date : this.formDisciplinaryError.disciplinary_status.document.release_date; 

    }
    if (this.formDisciplinaryError.issue_correction_status.id == null || this.formDisciplinaryError.issue_correction_status.id == "") {
      this.formDisciplinaryError.issue_correction_status = new IssueCorrectionStatusModel();
      this.formDisciplinaryError.issue_correction_status.status = new StatusModel();
      this.formDisciplinaryError.issue_correction_status.status.contents = this.formDisciplinaryError.issue_correction_status == null ? "" : this.formDisciplinaryError.issue_correction_status.status == null ? "" : this.formDisciplinaryError.issue_correction_status.status.contents == null ? "" : this.formDisciplinaryError.issue_correction_status.status.contents;
      this.formDisciplinaryError.issue_correction_status.note = this.formDisciplinaryError.issue_correction_status == null ? "" : this.formDisciplinaryError.issue_correction_status.note;
      this.formDisciplinaryError.issue_correction_status.file_name = this.formDisciplinaryError.issue_correction_status == null ? "Chưa có file chứng từ liên quan!" : this.formDisciplinaryError.issue_correction_status.file_name;
    }
  }
  async ngOnInit() {
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

  async onSave() {
    // var res = await this._disciplineErrorService.updateFormOfDiscipline(this.formDisciplinaryError);
    // if(res.code == "200"){
    //   this._notifierService.success("Thông Báo","Cập nhật thành công!");
    //   this.onClose();
    // }else{
    //   this._notifierService.error("Thông Báo","Cập nhật lỗi! ");
    // }
  }
}