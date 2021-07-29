import { Component, ElementRef, Renderer2, Input, OnInit, OnDestroy, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel, ProfessionalGroupModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { NotificationService } from '@/_components/notification/_services';
import { NotifierService } from '@/_services';
import { GroupErrorModel } from '@/pages/manager/risk-compliance/Model/error.model';

@Component({
  templateUrl: './edit-error-group.component.html',
  styleUrls: ['./edit-error-group.component.css']
})

export class EditErrorGroupComponent implements OnInit {
  formGroupError: GroupErrorModel;
  rqProfessionalGroup:ProfessionalGroupModel;
  ProfessionalGroup:ProfessionalGroupModel[];
  
  rqBusinessSegment:BusinessSegmentModel;
  BusinessSegment:BusinessSegmentModel[];
  heroForm: FormGroup;
  dataEdit: GroupErrorModel

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<EditErrorGroupComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: GroupErrorModel) {
      this.dataEdit = data;
      this.formGroupError = new GroupErrorModel();
      this.rqProfessionalGroup = new ProfessionalGroupModel();
      this.rqBusinessSegment = new BusinessSegmentModel();
      this.rqProfessionalGroup.parent = new BusinessSegmentModel();
      this.formGroupError.professional_group = new ProfessionalGroupModel();
      this.formGroupError.id = this.dataEdit.id;
      this.formGroupError.professional_group.parent = this.dataEdit.professional_group.parent;
      this.formGroupError.professional_group = this.dataEdit.professional_group;
      this.formGroupError.code = this.dataEdit.code;
      this.formGroupError.name = this.dataEdit.name;
      this.formGroupError.description = this.dataEdit.description;
      this.formGroupError.is_actived = this.dataEdit.is_actived;
      this.formGroupError.created_data = this.dataEdit.created_data;
  }
  async ngOnInit() {
    this.rqBusinessSegment.is_actived = 1;
    var rsBusinessSegment = await this._rickComplianceService.GetBusinessSegment(this.rqBusinessSegment);
    this.BusinessSegment = rsBusinessSegment.data;
    
    const heroForm = new FormGroup({
      'business_segment': new FormControl(),
      'professional_group': new FormControl(),
      'code': new FormControl(),
      'name': new FormControl(),
      'is_actived': new FormControl(),
    });
    this.heroForm = new FormGroup({
      business_segment: new FormControl(this.formGroupError.professional_group.parent, Validators.required),
      professional_group: new FormControl(this.formGroupError.professional_group, Validators.required),
      code: new FormControl(this.formGroupError.code, Validators.required),
      name: new FormControl(this.formGroupError.name, Validators.required),
      is_actived: new FormControl(this.formGroupError.is_actived, [Validators.required])
    });
  }
  get business_segment() { return this.heroForm.get('business_segment'); }
  get professional_group() { return this.heroForm.get('professional_group'); }
  get code() { return this.heroForm.get('code'); }
  get name() { return this.heroForm.get('name'); }
  get is_actived() { return this.heroForm.get('is_actived'); }
  onClose(): void {
    this.dialogRef.close();
  }
  async onSelectBusinessSegment(item, business_segment){
    this.rqProfessionalGroup.is_actived = 1;
    this.rqProfessionalGroup.parent.id = business_segment.id;
    var rsProfessionalGroup = await this._rickComplianceService.getProfessionalGroup(this.rqProfessionalGroup);
    this.ProfessionalGroup = rsProfessionalGroup.data;
  }

  async onSave() {
    var res = await this._rickComplianceService.updateGroupError(this.formGroupError);
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