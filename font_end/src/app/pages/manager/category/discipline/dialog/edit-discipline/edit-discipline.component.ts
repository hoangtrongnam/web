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

@Component({
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.css']
})

export class EditDisciplineComponent implements OnInit {
  formFormOfDiscipline: FormOfDisciplineModel;  
  heroForm: FormGroup;
  dataEdit: FormOfDisciplineModel

  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<EditDisciplineComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: FormOfDisciplineModel) {
      this.dataEdit = data;
      this.formFormOfDiscipline = new FormOfDisciplineModel();
      this.formFormOfDiscipline = this.dataEdit;
  }
  async ngOnInit() {    
    const heroForm = new FormGroup({
      'id': new FormControl(),
      'form_of_discipline': new FormControl(),
      'minus_point': new FormControl(),
      'is_actived': new FormControl()
    });
    this.heroForm = new FormGroup({
      id: new FormControl(this.formFormOfDiscipline.id, Validators.required),
      form_of_discipline: new FormControl(this.formFormOfDiscipline.form_of_discipline, Validators.required),
      minus_point: new FormControl(this.formFormOfDiscipline.minus_point, Validators.required),
      is_actived: new FormControl(this.formFormOfDiscipline.is_actived, [Validators.required])
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
    var res = await this._disciplineErrorService.updateFormOfDiscipline(this.formFormOfDiscipline);
    if(res.code == "200"){
      this._notifierService.success("Thông Báo","Cập nhật thành công!");
      this.onClose();
    }
    else if(res.code == "404")
    {
      this._notifierService.error("Thông Báo","Mã Đã Tồn Tại!");
    }
    else{
      this._notifierService.error("Thông Báo","Cập nhật lỗi! ");
    }
  }
}