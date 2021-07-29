import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { NotifierService } from '@/_services';
import { DisciplinaryOriginErrorModel } from '@/pages/manager/disciplinary-error/Models/disciplinary-origin-error.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { FormOfDisciplineModel } from '@/pages/manager/disciplinary-error/Models/form-of-discipline.model';

@Component({
  templateUrl: './add-discipline.component.html',
  styleUrls: ['./add-discipline.component.css']
})

export class AddDisciplineComponent implements OnInit {
  formFormOfDiscipline: FormOfDisciplineModel;
  heroForm: FormGroup;

  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<AddDisciplineComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: FormOfDisciplineModel) {
      this.formFormOfDiscipline = new FormOfDisciplineModel();
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
    console.log(this.formFormOfDiscipline)
    var res = await this._disciplineErrorService.insertFormOfDiscipline(this.formFormOfDiscipline);
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