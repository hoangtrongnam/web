import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { NotifierService } from '@/_services';

@Component({
  templateUrl: './add-business-segment.component.html',
  styleUrls: ['./add-business-segment.component.css']
})

export class AddBusinessSegmentComponent implements OnInit {
  formMajor: BusinessSegmentModel;
  editData:BusinessSegmentModel;
  rqBranch:BranchModel;
  Branch:BranchModel[];
  heroForm: FormGroup;

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<AddBusinessSegmentComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: BusinessSegmentModel) {
      this.formMajor = new BusinessSegmentModel();
      this.rqBranch = new BranchModel();
      // this.formMajor.parent_id = "1";
  }
  async ngOnInit() {
    this.rqBranch.flag = "2";
    this.rqBranch.is_actived = "1";
    var rsBranch = await this._rickComplianceService.GetBranch(this.rqBranch);
    this.Branch = rsBranch.data;
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
  get branch() { return this.heroForm.get('branch'); }
  get code() { return this.heroForm.get('code'); }
  get name() { return this.heroForm.get('name'); }
  get is_actived() { return this.heroForm.get('is_actived'); }
  onClose(): void {
    this.dialogRef.close();
  }


  async onSave() {
    console.log(this.formMajor)
    var res = await this._rickComplianceService.InsertBusinessSegment(this.formMajor);
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