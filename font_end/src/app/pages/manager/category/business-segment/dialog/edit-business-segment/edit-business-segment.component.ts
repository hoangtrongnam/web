import { Component, OnInit, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { NotifierService } from '@/_services';

@Component({
  templateUrl: './edit-business-segment.component.html',
  styleUrls: ['./edit-business-segment.component.css']
})

export class EditBusinessSegmentComponent implements OnInit {
  formMajor: BusinessSegmentModel;
  editData:BusinessSegmentModel;
  rqBranch:BranchModel;
  Branch:BranchModel;
  heroForm: FormGroup;

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<EditBusinessSegmentComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: BusinessSegmentModel) {
      this.editData = data;
      this.formMajor = new BusinessSegmentModel();
      this.rqBranch = new BranchModel();
      // this.formMajor.parent_id = "1";
  }
  async ngOnInit() {
    this.formMajor.id = this.editData.id;
    this.formMajor.branch = this.editData.branch;
    this.formMajor.code = this.editData.code;
    this.formMajor.name = this.editData.name;
    this.formMajor.is_actived = this.editData.is_actived;
    this.rqBranch.flag = "2";
    this.rqBranch.is_actived = "1";
    var rsBranch = await this._rickComplianceService.GetBranch(this.rqBranch);
    this.Branch = rsBranch.data.filter(s => s.id != this.editData.branch.id);
    const heroForm = new FormGroup({
      'branch': new FormControl(),
      'code': new FormControl(),
      'name': new FormControl(),
      'is_actived': new FormControl(),
    });
    this.heroForm = new FormGroup({
      branch: new FormControl(this.formMajor.branch, Validators.required),
      code: new FormControl(this.formMajor.code, Validators.required),
      name: new FormControl(this.formMajor.name, Validators.required),
      is_actived: new FormControl(this.formMajor.is_actived, [Validators.required])
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }


  async onSave() {
    var res = await this._rickComplianceService.UpdateBusinessSegment(this.formMajor);
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