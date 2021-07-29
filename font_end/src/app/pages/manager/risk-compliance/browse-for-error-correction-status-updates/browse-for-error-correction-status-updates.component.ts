import { Component, OnInit } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../Model/major.model';
import { RiskComplianceModel } from '../Model/risk-compliance.model';
import { StatusModel } from '../Model/status.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CorrectiveInfoModel } from '../Model/corrective-info.model';
import { DetailErrorModel, GroupErrorModel } from '../Model/error.model';

@Component({
  selector: 'app-browse-for-error-correction-status-updates',
  templateUrl: './browse-for-error-correction-status-updates.component.html',
  styleUrls: ['./browse-for-error-correction-status-updates.component.css']
})
export class BrowseForErrorCorrectionStatusUpdatesComponent implements OnInit {
  dataTable: RiskComplianceModel[];
  formRiskCompliance: RiskComplianceModel;
  heroForm: FormGroup;
  array_major_data: BusinessSegmentModel[];
  group_major_data: ProfessionalGroupModel;
  status: StatusModel;
  requestRiskCompliance: RiskComplianceModel;
  status_corrective_info: StatusModel;
  rq_status: StatusModel;
  approved_status: any;
  allFlag: boolean;
  rs_group_major_data: ProfessionalGroupModel;''
  BusinessSegmentAll: BusinessSegmentModel;
  parent:BusinessSegmentModel;
  professional_group: ProfessionalGroupModel;
  returnUrl: any;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formRiskCompliance = new RiskComplianceModel();
    this.formRiskCompliance.corrective_status = new CorrectiveInfoModel();
    this.formRiskCompliance.corrective_status.status = new StatusModel();
    this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.formRiskCompliance.detail_error.error_group = new GroupErrorModel();
    this.formRiskCompliance.detail_error.error_group.professional_group = new ProfessionalGroupModel();
    this.BusinessSegmentAll = new BusinessSegmentModel();
    this.BusinessSegmentAll.id = null;
    this.BusinessSegmentAll.code = "-1";
    this.BusinessSegmentAll.name = "Tất cả";
    this.parent = this.BusinessSegmentAll;
  }
  async ngOnInit() {
    this.initData();
    await this.initData();
    this.allFlag = false;
  }
  get created_date() { return this.heroForm.get('created_date'); }
  get business_segment() { return this.heroForm.get('business_segment'); }
  get group_business_segment() { return this.heroForm.get('group_business_segment'); }

  async initData() {
    this.rq_status = new StatusModel();
    this.rq_status.use_table = "APPROVED";
    this.status_corrective_info = new StatusModel();
    this.status_corrective_info.use_table = "CORRECTIVE_INFO";
    var array_major = await this._rickComplianceService.GetBusinessSegment();
    var rs_status = await this._rickComplianceService.GetStatus(this.rq_status);
    this.array_major_data = array_major.data;
    this.approved_status = rs_status.data.filter(s => s.code != "2");
    this.formRiskCompliance = new RiskComplianceModel();
    var rs_status_corrective_info = await this._rickComplianceService.GetStatus(this.status_corrective_info);
    this.status_corrective_info = rs_status_corrective_info.data.filter(s => s.code != "-1");
  }
  async onSelectArrayMajor(event, item) {
    
    this.professional_group = new ProfessionalGroupModel();
    this.professional_group.id = null;
    this.professional_group.code = "-1";
    this.professional_group.name = "Tất Cả";
    
    this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.formRiskCompliance.detail_error.error_group = new GroupErrorModel();
    this.formRiskCompliance.detail_error.error_group.professional_group = new ProfessionalGroupModel();
    this.formRiskCompliance.detail_error.error_group.professional_group.parent = item;
    this.group_major_data = new ProfessionalGroupModel();
    this.group_major_data.parent = new BusinessSegmentModel();
    this.group_major_data.parent = item;
    this.group_major_data.is_actived = 1;
    const group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data);
    this.rs_group_major_data = group_major.data;
  }
  async onSelectGroupMajor(event, item) {
    this.formRiskCompliance.detail_error.error_group.professional_group = item;
  }
  async clickAllChecked() {
    if (this.allFlag == false) {
      this.dataTable.forEach(s => s.corrective_status.approved.flag = true);
    }
    else {
      this.dataTable.forEach(s => s.corrective_status.approved.flag = false);
    }
  }
  async viewRickCompliance(item) {
    localStorage.setItem('item', JSON.stringify(item));
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/view-compliance-error-recording';
    this.router.navigate([this.returnUrl], { queryParams: { } });
  }
  async onSubmitSearch() {
    debugger
    this.formRiskCompliance.approved_status = new StatusModel();
    this.formRiskCompliance.approved_status.code = "1";
    this.formRiskCompliance.corrective_status = new CorrectiveInfoModel();
    this.formRiskCompliance.corrective_status.status = new StatusModel();
    this.formRiskCompliance.corrective_status.status.code = "3";
    // code: "3"
    // contents: "Đã khắc phục"
    // flag: false
    // id: "BD2C549AC4FBB86EE053354AA8C0A680"
    // use_table: "CORRECTIVE_INFO"
    var rs_data = await this._rickComplianceService.getRickCompliance(this.formRiskCompliance);
    this.dataTable = rs_data.data;
  }
  async onSave() {
    var rs_data = await this._rickComplianceService.UploadRickCompliance(this.dataTable);
    if (rs_data.code == "200") {
      this.notifierService.success("Thông báo", "Duyệt thành công!");
    }
    else {
      this.notifierService.error("Thông báo", "Duyệt thất bại!");
    }
  }
}
