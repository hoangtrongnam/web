import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, NotifierService } from '@/_services';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BusinessSegmentModel, ProfessionalGroupModel } from './Model/major.model';
import { FormRiskComplianceModel, RiskComplianceModel } from './Model/risk-compliance.model';
import { StatusModel } from './Model/status.model';
import { DetailErrorModel, GroupErrorModel } from './Model/error.model';
import { CorrectiveInfoModel } from './Model/corrective-info.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComplianceErrorRecordingComponent } from '.';

@Component({
  templateUrl: './risk-compliance.component.html',
  styleUrls: ['./risk-compliance.component.css']
})
export class RiskComplianceComponent implements OnInit {
  formRiskCompliance : RiskComplianceModel;
  array_major_data: BusinessSegmentModel[];
  group_major_data: ProfessionalGroupModel;
  status: StatusModel;
  status_corrective_info: StatusModel;
  dataTable: RiskComplianceModel[];
  rq_major_data: BusinessSegmentModel;
  returnUrl: any;
  rs_group_major_data: ProfessionalGroupModel[];
  BusinessSegmentAll: BusinessSegmentModel;
  business_segment:BusinessSegmentModel;
  professional_group: ProfessionalGroupModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private notifierService: NotifierService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.formRiskCompliance = new RiskComplianceModel();
    this.formRiskCompliance.approved_status = new StatusModel();
    this.formRiskCompliance.corrective_status = new CorrectiveInfoModel();
    this.formRiskCompliance.corrective_status.status = new StatusModel();
    this.formRiskCompliance.detail_error = new DetailErrorModel();
    this.formRiskCompliance.detail_error.error_group = new GroupErrorModel();
    this.formRiskCompliance.detail_error.error_group.professional_group = new ProfessionalGroupModel();
    
    this.BusinessSegmentAll = new BusinessSegmentModel();
    this.BusinessSegmentAll.id = null;
    this.BusinessSegmentAll.code = "-1";
    this.BusinessSegmentAll.name = "Tất cả";
    this.business_segment = this.BusinessSegmentAll;
  }

  async ngOnInit() {
    await this.initData();
  }
  async initData() {
    this.status = new StatusModel();
    this.status.use_table = "APPROVED";
    this.group_major_data = new ProfessionalGroupModel();
    this.rq_major_data = new BusinessSegmentModel();
    this.status_corrective_info = new StatusModel();
    this.status_corrective_info.use_table = "CORRECTIVE_INFO";
    // this.rq_major_data.parent_id = "1";
    var array_major = await this._rickComplianceService.GetBusinessSegment(this.rq_major_data);
    this.array_major_data = array_major.data;

    var rs_status = await this._rickComplianceService.GetStatus(this.status);
    this.status = rs_status.data.filter(s => s.code != "2");
    this.formRiskCompliance.approved_status = rs_status.data.filter(s => s.code == "-1")[0];

    var rs_status_corrective_info = await this._rickComplianceService.GetStatus(this.status_corrective_info);
    this.status_corrective_info = rs_status_corrective_info.data;//.filter(s => s.code != "-1");
    this.formRiskCompliance.corrective_status.status = rs_status_corrective_info.data.filter(s => s.code == "-1")[0];
  }
  async onSelectArrayMajor(event, item) {
    // reset item con
    // this.error_group = new GroupErrorModel();
    // this.rs_group_error_data = [];
    // this.formRiskCompliance.detail_error = new DetailErrorModel();
    // this.error_data = [];
    this.professional_group = new ProfessionalGroupModel();
    this.professional_group.id = null;
    this.professional_group.code = "-1";
    this.professional_group.name = "Tất Cả";
    if(item.code == "-1")
    {
      this.formRiskCompliance.detail_error.error_group.professional_group = this.professional_group;
      this.rs_group_major_data=[];
    }
    else{
      this.group_major_data = new ProfessionalGroupModel();
      this.group_major_data.parent = new BusinessSegmentModel();
      this.group_major_data.parent = item;
      this.group_major_data.is_actived = 1;
      const group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data);
      this.rs_group_major_data = group_major.data;
    }
    this.formRiskCompliance.detail_error.error_group.professional_group.parent = item;
  }
  // async onSelectArrayMajor(event, item) {
  //   this.group_major_data = [];
  //   this.group_major_data.parent = new BusinessSegmentModel();
  //   this.group_major_data.parent.id = item.id;
  //   var group_major = await this._rickComplianceService.getProfessionalGroup(this.group_major_data)
  //   this.group_major_data = group_major.data;
  // }
  async onSubmitSearch() {
    debugger
    var rs_data = await this._rickComplianceService.getRickCompliance(this.formRiskCompliance);
    this.dataTable = rs_data.data;
    console.log(rs_data.data)
  }
  async onSave() {
    console.log(this.dataTable)
    var rs_data = await this._rickComplianceService.UploadRickCompliance(this.dataTable);
    if (rs_data.code == "200") {
      this.notifierService.success("Thông báo", "Duyệt thành công!");
    }
    else {
      this.notifierService.error("Thông báo", "Duyệt thất bại!");
    }
  }
  
  async addRickCompliance() {
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/compliance-error-recording';
    this.router.navigate([this.returnUrl], { queryParams: { } });
  }
  async CorrectiveStatus(item) {
    const dialogRef = this.dialog.open(DialogComplianceErrorRecordingComponent, {
      width: '1200px',
      height : '1200px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
      this.onSubmitSearch();
    });
  }
  async editRickCompliance(item) {
    localStorage.setItem('item', JSON.stringify(item));
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/edit-compliance-error-recording';
    this.router.navigate([this.returnUrl], { queryParams: { } });
  }
  async viewRickCompliance(item) {
    localStorage.setItem('item', JSON.stringify(item));
    this.returnUrl = await this.route.snapshot.queryParams['returnUrl'] || '/view-compliance-error-recording';
    this.router.navigate([this.returnUrl], { queryParams: { } });
  }
  async onRemove(item)
  {
    var response = await this._rickComplianceService.DeletedRickCompliance(item);
    if (response.code == "200") {
      this.notifierService.success("Thông báo", "Xóa thành công!");
      this.onSubmitSearch();
    }
    else {
      this.notifierService.error("Thông báo", "Xóa thất bại!");
    }
  }
  get diagnostic() { return JSON.stringify(this.formRiskCompliance); }
}
