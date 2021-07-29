import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from '@/_services';
import { DisciplinaryOriginErrorModel } from '@/pages/manager/disciplinary-error/Models/disciplinary-origin-error.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';

@Component({
  templateUrl: './add-disciplinary-origin-error.component.html',
  styleUrls: ['./add-disciplinary-origin-error.component.css']
})

export class AddDisciplinaryOriginErrorComponent implements OnInit {
  
  formDisciplinaryOriginError: DisciplinaryOriginErrorModel;
  heroForm: FormGroup;
  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private _notifierService : NotifierService,    
    public dialogRef: MatDialogRef<AddDisciplinaryOriginErrorComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: DisciplinaryOriginErrorModel) {
      this.formDisciplinaryOriginError = new DisciplinaryOriginErrorModel();
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
    var res = await this._disciplineErrorService.insertDisciplinaryOriginError(this.formDisciplinaryOriginError);
    if(res.code == "200"){
      this._notifierService.success("Thông Báo","Thêm thành công!");
      this.onClose();
    }
    else if(res.code == "404")
    {
      this._notifierService.error("Thông Báo","Mã Đã Tồn Tại!");
    }
    else{
      this._notifierService.error("Thông Báo","Thêm lỗi! ");
    }
  }
}