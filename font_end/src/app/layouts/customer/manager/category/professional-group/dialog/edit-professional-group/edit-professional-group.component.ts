import { Component, ElementRef, Renderer2, Input, OnInit, OnDestroy, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel, ProfessionalGroupModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { NotificationService } from '@/_components/notification/_services';
import { NotifierService } from '@/_services';

@Component({
  templateUrl: './edit-professional-group.component.html',
  styleUrls: ['./edit-professional-group.component.css']
})

export class EditProfessionalGroupComponent implements OnInit {
  formProfessionalGroup: ProfessionalGroupModel;
  editData:ProfessionalGroupModel;
  rqBusinessSegment:BusinessSegmentModel;
  businessSegment:BusinessSegmentModel;
  heroForm: FormGroup;

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<EditProfessionalGroupComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: ProfessionalGroupModel) {
      this.editData = data;
      this.formProfessionalGroup = new ProfessionalGroupModel();
      this.rqBusinessSegment = new BusinessSegmentModel();
  }
  async ngOnInit() {
    this.formProfessionalGroup.id = this.editData.id;
    this.formProfessionalGroup.parent = this.editData.parent;
    this.formProfessionalGroup.code = this.editData.code;
    this.formProfessionalGroup.name = this.editData.name;
    this.formProfessionalGroup.is_actived = this.editData.is_actived;

    this.rqBusinessSegment.is_actived = 1;
    var rsBusinessSegment = await this._rickComplianceService.GetBusinessSegment(this.rqBusinessSegment);
    this.businessSegment = rsBusinessSegment.data.filter(s => s.id != this.editData.parent.id);
    const heroForm = new FormGroup({
      'parent': new FormControl(),
      'code': new FormControl(),
      'name': new FormControl(),
      'is_actived': new FormControl()
    });
    this.heroForm = new FormGroup({
      parent: new FormControl(this.formProfessionalGroup.parent, Validators.required),
      code: new FormControl(this.formProfessionalGroup.code, Validators.required),
      name: new FormControl(this.formProfessionalGroup.name, Validators.required),
      is_actived: new FormControl(this.formProfessionalGroup.is_actived, [Validators.required])
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }


  async onSave() {
    var res = await this._rickComplianceService.updateProfessionalGroup(this.formProfessionalGroup);
    console.log(res);
    if(res.code == "200"){
      this._notifierService.success("Thông Báo","Cập nhật thành công!");
      this.onClose();
    }
    else if(res.code == "404")
    {
      this._notifierService.error("Thông Báo","Mã Đã Tồn Tại!");
    }
    else{
      this._notifierService.error("Thông Báo","Cập nhật lỗi! ")
    }
  }
}