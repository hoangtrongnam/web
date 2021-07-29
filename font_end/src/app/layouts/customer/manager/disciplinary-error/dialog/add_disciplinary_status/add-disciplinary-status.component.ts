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
import { StatusModel } from '@/pages/manager/risk-compliance/Model/status.model';
import { DisciplinaryStatusModel } from '../../Models/disciplinary-status-model';
import { DocumentModel } from '@/pages/manager/risk-compliance/Model/document.model';

@Component({
  templateUrl: './add-disciplinary-status.component.html',
  styleUrls: ['./add-disciplinary-status.component.css']
})

export class AddDisciplinaryStatusComponent implements OnInit {
  formDisciplinaryError: DisciplinaryErrorModel;
  heroForm: FormGroup;
  dataEdit: DisciplinaryErrorModel
  _user: StaffModel;
  staffFormOfDiscipline: StaffFormOfDisciplineModel;
  flag: boolean;
  list_form_of_discipline = new List<FormOfDisciplineModel>();
  status: StatusModel;
  list_status: StatusModel[] = [];

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService: NotifierService,
    public dialogRef: MatDialogRef<AddDisciplinaryStatusComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: DisciplinaryErrorModel) {
    this.dataEdit = data;
    if(this.dataEdit.disciplinary_status.status != null && this.dataEdit.disciplinary_status.document != null)
    {
      this.formDisciplinaryError = new DisciplinaryErrorModel();
      this.formDisciplinaryError.disciplinary_status = new DisciplinaryStatusModel();
      this.formDisciplinaryError.disciplinary_status.status = new StatusModel();
      this.formDisciplinaryError.disciplinary_status.document = new DocumentModel();
      this.formDisciplinaryError = this.dataEdit;
      this.formDisciplinaryError.unit_request = this.dataEdit.unit_request;
      this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.dataEdit.detail_issue.staff_form_of_discipline;
    }
    else{
      this.formDisciplinaryError = new DisciplinaryErrorModel();
      this.formDisciplinaryError = this.dataEdit;
      this.formDisciplinaryError.disciplinary_status = new DisciplinaryStatusModel();
      this.formDisciplinaryError.disciplinary_status.status = new StatusModel();
      this.formDisciplinaryError.disciplinary_status.document = new DocumentModel();
      this.formDisciplinaryError.unit_request = this.dataEdit.unit_request;
      this.formDisciplinaryError.detail_issue.staff_form_of_discipline = this.dataEdit.detail_issue.staff_form_of_discipline;
    }
  }
  async ngOnInit() {
    this.status = new StatusModel();
    this.status.use_table = "DISCIPLINARY_STATUS";
    var rs_status = await this._rickComplianceService.GetStatus(this.status);

    this.list_status = rs_status.data.filter(s => s.code != "-1");
    let code = this.formDisciplinaryError.disciplinary_status.status == null ? "1" :this.formDisciplinaryError.disciplinary_status.status.code == null ? "1" : this.formDisciplinaryError.disciplinary_status.status.code;
    this.formDisciplinaryError.disciplinary_status.status = rs_status.data.filter(s => s.code == code)[0];

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
  async onSave() {
    console.log(this.formDisciplinaryError)
    var res = await this._disciplineErrorService.updateDisciplinaryError(this.formDisciplinaryError);
    if (res.code == "200") {
      this._notifierService.success("Thông Báo", "Cập nhật thành công!");
      this.onClose();
    } else {
      this._notifierService.error("Thông Báo", "Cập nhật lỗi! ");
    }
  }
}