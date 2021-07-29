import { Component, ElementRef, Renderer2, Input, OnInit, OnDestroy, Inject } from '@angular/core';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessSegmentModel, ProfessionalGroupModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { NotificationService } from '@/_components/notification/_services';
import { NotifierService } from '@/_services';
import { DetailErrorModel, GroupErrorModel } from '@/pages/manager/risk-compliance/Model/error.model';

@Component({
  templateUrl: './edit-error-details.component.html',
  styleUrls: ['./edit-error-details.component.css']
})

export class EditErrorDetailsComponent implements OnInit {
  formDetailsError: DetailErrorModel;
  editData:ProfessionalGroupModel;
  rqProfessionalGroup:ProfessionalGroupModel;
  rqGroupError:GroupErrorModel;
  ProfessionalGroup:ProfessionalGroupModel[];
  GroupError:GroupErrorModel[];
  
  rqBusinessSegment:BusinessSegmentModel;
  BusinessSegment:BusinessSegmentModel[];
  heroForm: FormGroup;
  dataEdit: DetailErrorModel

  constructor(
    private _rickComplianceService: RickComplianceService,
    private _notifierService : NotifierService,
    public dialogRef: MatDialogRef<EditErrorDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: DetailErrorModel) {
      this.dataEdit = data;
      this.formDetailsError = new DetailErrorModel();
      this.rqProfessionalGroup = new ProfessionalGroupModel();
      this.rqBusinessSegment = new BusinessSegmentModel();
      this.rqProfessionalGroup.parent = new BusinessSegmentModel();
      this.rqGroupError = new GroupErrorModel();
      this.rqGroupError.professional_group = new ProfessionalGroupModel();
      this.formDetailsError.error_group = new GroupErrorModel();
      this.formDetailsError.error_group.professional_group = new ProfessionalGroupModel();
      this.formDetailsError.error_group.professional_group.parent = new BusinessSegmentModel();
      this.formDetailsError.id = this.dataEdit.id;
      this.formDetailsError.error_group = this.dataEdit.error_group;
      this.formDetailsError.error_group.professional_group = this.dataEdit.error_group.professional_group;
      this.formDetailsError.error_group.professional_group.parent = this.dataEdit.error_group.professional_group.parent;
      this.formDetailsError.code = this.dataEdit.code;
      this.formDetailsError.name = this.dataEdit.name;
      this.formDetailsError.rank_errors = this.dataEdit.rank_errors;
      
      this.formDetailsError.violate = this.dataEdit.violate;
      this.formDetailsError.remind = this.dataEdit.remind;
      this.formDetailsError.criticize = this.dataEdit.criticize;
      this.formDetailsError.warning = this.dataEdit.warning;
      this.formDetailsError.reprimand = this.dataEdit.reprimand;
      this.formDetailsError.dismissed = this.dataEdit.dismissed;
      this.formDetailsError.lay_off = this.dataEdit.lay_off;
      this.formDetailsError.adjustable_processing_method = this.dataEdit.adjustable_processing_method;
      this.formDetailsError.standard_processing_process = this.dataEdit.standard_processing_process;
      this.formDetailsError.suspend_work_to_verify_clarification = this.dataEdit.suspend_work_to_verify_clarification;
      this.formDetailsError.within_the_permitted_range = this.dataEdit.within_the_permitted_range;
      this.formDetailsError.proportion_of_assessment_by_component = this.dataEdit.proportion_of_assessment_by_component;
      this.formDetailsError.proportion_of_assessment_in_the_array = this.dataEdit.proportion_of_assessment_in_the_array;
      this.formDetailsError.monitoring_results = this.dataEdit.monitoring_results;
      this.formDetailsError.tracking_remedy = this.dataEdit.tracking_remedy;

      this.formDetailsError.description = this.dataEdit.description;
      this.formDetailsError.is_actived = this.dataEdit.is_actived;
      this.formDetailsError.created_data = this.dataEdit.created_data;
  }
  async ngOnInit() {
    this.rqBusinessSegment.is_actived = 1;
    var rsBusinessSegment = await this._rickComplianceService.GetBusinessSegment(this.rqBusinessSegment);
    this.BusinessSegment = rsBusinessSegment.data;
    
    const heroForm = new FormGroup({
      'business_segment': new FormControl(),
      'professional_group': new FormControl(),
      'error_group': new FormControl(),
      'code': new FormControl(),
      'name': new FormControl(),
      'rank_errors': new FormControl(),
      'violate': new FormControl(),
      'remind': new FormControl(),
      'criticize': new FormControl(),
      'warning': new FormControl(),
      'reprimand': new FormControl(),
      'dismissed': new FormControl(),
      'lay_off': new FormControl(),
      'adjustable_processing_method': new FormControl(),
      'standard_processing_process': new FormControl(),
      'suspend_work_to_verify_clarification': new FormControl(),
      'within_the_permitted_range': new FormControl(),
      'proportion_of_assessment_by_component': new FormControl(),
      'proportion_of_assessment_in_the_array': new FormControl(),
      'monitoring_results': new FormControl(),
      'tracking_remedy': new FormControl(),
      'is_actived': new FormControl()
    });
    this.heroForm = new FormGroup({
      // business_segment: new FormControl(this.formDetailsError.error_group.professional_group.parent, Validators.required),
      // professional_group: new FormControl(this.formDetailsError.error_group.professional_group, Validators.required),
      error_group: new FormControl(this.formDetailsError.error_group, Validators.required),
      code: new FormControl(this.formDetailsError.code, Validators.required),
      name: new FormControl(this.formDetailsError.name, Validators.required),
      rank_errors: new FormControl(this.formDetailsError.rank_errors, Validators.required),
      violate: new FormControl(this.formDetailsError.violate, Validators.required),
      remind: new FormControl(this.formDetailsError.remind, Validators.required),
      criticize: new FormControl(this.formDetailsError.criticize, Validators.required),
      warning: new FormControl(this.formDetailsError.warning, Validators.required),
      reprimand: new FormControl(this.formDetailsError.reprimand, Validators.required),
      dismissed: new FormControl(this.formDetailsError.dismissed, Validators.required),
      lay_off: new FormControl(this.formDetailsError.lay_off, Validators.required),
      adjustable_processing_method: new FormControl(this.formDetailsError.adjustable_processing_method, Validators.required),
      standard_processing_process: new FormControl(this.formDetailsError.standard_processing_process, Validators.required),
      suspend_work_to_verify_clarification: new FormControl(this.formDetailsError.suspend_work_to_verify_clarification, Validators.required),
      within_the_permitted_range: new FormControl(this.formDetailsError.within_the_permitted_range, Validators.required),
      proportion_of_assessment_by_component: new FormControl(this.formDetailsError.proportion_of_assessment_by_component, Validators.required),
      proportion_of_assessment_in_the_array: new FormControl(this.formDetailsError.proportion_of_assessment_in_the_array, Validators.required),
      monitoring_results: new FormControl(this.formDetailsError.monitoring_results, Validators.required),
      tracking_remedy: new FormControl(this.formDetailsError.tracking_remedy, Validators.required),
      is_actived: new FormControl(this.formDetailsError.is_actived, [Validators.required])
    });
  }
  // get business_segment() { return this.heroForm.get('business_segment'); }
  // get professional_group() { return this.heroForm.get('professional_group'); }
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
    var res = await this._rickComplianceService.updateDetailError(this.formDetailsError);
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