import { Component, ElementRef, Renderer2, Input, OnInit, OnDestroy, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel, ProfessionalGroupModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { NotifierService } from '@/_services';
import { GroupErrorModel } from '@/pages/manager/risk-compliance/Model/error.model';

@Component({
  templateUrl: './add-error-group.component.html',
  styleUrls: ['./add-error-group.component.css']
})

export class AddErrorGroupComponent implements OnInit {
  formGroupError: GroupErrorModel;
  editData:ProfessionalGroupModel;
  rqProfessionalGroup:ProfessionalGroupModel;
  ProfessionalGroup:ProfessionalGroupModel[];
  
  rqBusinessSegment:BusinessSegmentModel;
  BusinessSegment:BusinessSegmentModel[];
  heroForm: FormGroup;

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<AddErrorGroupComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: GroupErrorModel) {
      this.formGroupError = new GroupErrorModel();
      this.rqProfessionalGroup = new ProfessionalGroupModel();
      this.rqBusinessSegment = new BusinessSegmentModel();
      this.rqProfessionalGroup.parent = new BusinessSegmentModel();
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
    var res = await this._rickComplianceService.insertGroupError(this.formGroupError);
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