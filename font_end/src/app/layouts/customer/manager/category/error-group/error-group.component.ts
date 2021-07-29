import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../../risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { MatDialog } from '@angular/material/dialog';
import { AddErrorGroupComponent, EditErrorGroupComponent } from './dialog';
import { GroupErrorModel } from '../../risk-compliance/Model/error.model';
@Component({
  selector: 'app-error-group',
  templateUrl: './error-group.component.html',
  styleUrls: ['./error-group.component.css']
})
export class ErrorGroupComponent implements OnInit {
  status: StatusModel;
  dataTable: GroupErrorModel[];
  formErrorGroup: GroupErrorModel;
  rq_dropList: BusinessSegmentModel;
  businessSegment: BusinessSegmentModel;
  BusinessSegmentAll: BusinessSegmentModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private dialog: MatDialog
  ) {
    this.formErrorGroup = new GroupErrorModel();
    this.formErrorGroup.professional_group = new ProfessionalGroupModel();
    // this.businessSegment = new BusinessSegmentModel();
    this.BusinessSegmentAll = new BusinessSegmentModel();
    this.BusinessSegmentAll.id = null;
    this.BusinessSegmentAll.code = "-1";
    this.BusinessSegmentAll.name = "Tất cả";
    this.businessSegment = this.BusinessSegmentAll;
  }

  ngOnInit() {
    this.initData();
  }
  async initData() {
    this.rq_dropList = new BusinessSegmentModel();
    var rs_dropList = await this._rickComplianceService.GetBusinessSegment(this.rq_dropList);
    this.rq_dropList = rs_dropList.data;
    this.formErrorGroup.professional_group.parent = this.BusinessSegmentAll;//this.rq_dropList[0];
    this.onSubmitSearch();
  }
  async onSubmitSearch() {
    this.formErrorGroup.professional_group.parent = this.businessSegment;
    console.log(this.formErrorGroup);
    var rs = await this._rickComplianceService.getGroupError(this.formErrorGroup);
    this.dataTable = rs.data;
  }
  get diagnostic() { return JSON.stringify(this.formErrorGroup); }
  async edit(item)
  {
    const dialogRef = this.dialog.open(EditErrorGroupComponent, {
      width: '600px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async add()
  {
    const dialogRef = this.dialog.open(AddErrorGroupComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
}
