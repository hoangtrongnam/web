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

@Component({
  templateUrl: './edit-disciplinary-origin-error.component.html',
  styleUrls: ['./edit-disciplinary-origin-error.component.css']
})

export class EditDisciplinaryOriginErrorComponent implements OnInit {
  formDisciplinaryOriginError: DisciplinaryOriginErrorModel;  
  heroForm: FormGroup;
  dataEdit: DisciplinaryOriginErrorModel

  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<EditDisciplinaryOriginErrorComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: DisciplinaryOriginErrorModel) {
      this.dataEdit = data;
      console.log(this.dataEdit)
      this.formDisciplinaryOriginError = new DisciplinaryOriginErrorModel();
      this.formDisciplinaryOriginError = this.dataEdit;
      console.log(this.formDisciplinaryOriginError)
  }
  async ngOnInit() {    
    const heroForm = new FormGroup({
      'id': new FormControl(),
      'code': new FormControl(),
      'name': new FormControl(),
      'is_actived': new FormControl()
    });
    this.heroForm = new FormGroup({
      id: new FormControl(this.formDisciplinaryOriginError.id, Validators.required),
      code: new FormControl(this.formDisciplinaryOriginError.code, Validators.required),
      name: new FormControl(this.formDisciplinaryOriginError.name, Validators.required),
      is_actived: new FormControl(this.formDisciplinaryOriginError.is_actived, [Validators.required])
    });
  }
  get id() { return this.heroForm.get('id'); }
  get code() { return this.heroForm.get('code'); }
  get name() { return this.heroForm.get('name'); }
  get is_actived() { return this.heroForm.get('is_actived'); }
  onClose(): void {
    this.dialogRef.close();
  }

  async onSave() {
    var res = await this._disciplineErrorService.updateDisciplinaryOriginError(this.formDisciplinaryOriginError);
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