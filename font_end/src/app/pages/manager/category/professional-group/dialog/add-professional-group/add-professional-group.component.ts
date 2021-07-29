import { Component, ElementRef, Renderer2, Input, OnInit, OnDestroy, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel, ProfessionalGroupModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { NotifierService } from '@/_services';

@Component({
  templateUrl: './add-professional-group.component.html',
  styleUrls: ['./add-professional-group.component.css']
})

export class AddProfessionalGroupComponent implements OnInit {
  formProfessionalGroup: ProfessionalGroupModel;
  editData:ProfessionalGroupModel;
  rqMajor:BusinessSegmentModel;
  Major:BranchModel[];
  heroForm: FormGroup;

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<AddProfessionalGroupComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: ProfessionalGroupModel) {
      this.formProfessionalGroup = new ProfessionalGroupModel();
      this.rqMajor = new BusinessSegmentModel();
  }
  async ngOnInit() {
    this.rqMajor.is_actived = 1;
    var rsMajor = await this._rickComplianceService.GetBusinessSegment(this.rqMajor);
    this.Major = rsMajor.data;
    console.log(this.Major);
    const heroForm = new FormGroup({
      'parent': new FormControl(),
      'code': new FormControl(),
      'name': new FormControl(),
      'is_actived': new FormControl(),
    });
    this.heroForm = new FormGroup({
      parent: new FormControl(this.formProfessionalGroup.parent, Validators.required),
      code: new FormControl(this.formProfessionalGroup.code, Validators.required),
      name: new FormControl(this.formProfessionalGroup.name, Validators.required),
      is_actived: new FormControl(this.formProfessionalGroup.is_actived, [Validators.required])
    });
  }
  get parent() { return this.heroForm.get('parent'); }
  get code() { return this.heroForm.get('code'); }
  get name() { return this.heroForm.get('name'); }
  get is_actived() { return this.heroForm.get('is_actived'); }
  onClose(): void {
    this.dialogRef.close();
  }


  async onSave() {
    console.log(this.formProfessionalGroup)
    var res = await this._rickComplianceService.insertProfessionalGroup(this.formProfessionalGroup);
    console.log(res);
    if(res.code == "200"){
      this._notifierService.success("Thông Báo","Thêm mới thành công!");
      this.onClose();
    }
    else if(res.code == "404")
    {
      this._notifierService.error("Thông Báo","Mã Đã Tồn Tại!");
    }
    else{
      this._notifierService.error("Thông Báo","Thêm mới lỗi! ")
    }
  }
}