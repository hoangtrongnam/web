import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../../risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProfessionalGroupComponent, EditProfessionalGroupComponent } from './dialog';

@Component({
  selector: 'app-professional-group',
  templateUrl: './professional-group.component.html',
  styleUrls: ['./professional-group.component.css']
})
export class ProfessionalGroupComponent implements OnInit {
  status: StatusModel;
  dataTable: ProfessionalGroupModel[];
  formProfessionalGroup: ProfessionalGroupModel;
  rq_dropList: BusinessSegmentModel;
  BusinessSegmentAll: BusinessSegmentModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private dialog: MatDialog
  ) {
    this.formProfessionalGroup = new ProfessionalGroupModel();
    this.BusinessSegmentAll = new BusinessSegmentModel();
    this.BusinessSegmentAll.id = null;
    this.BusinessSegmentAll.code = "-1";
    this.BusinessSegmentAll.name = "Tất cả";
  }

  ngOnInit() {
    this.initData();
  }
  async initData() {
    this.rq_dropList = new BusinessSegmentModel();
    // this.rq_dropList.parent_id = "1";
    var rs_dropList = await this._rickComplianceService.GetBusinessSegment(this.rq_dropList);
    this.rq_dropList = rs_dropList.data;
    this.formProfessionalGroup.parent = this.BusinessSegmentAll;//this.rq_dropList[0];
    this.onSubmitSearch();
  }
  async onSelectArrayMajor(event, item) {
  }
  async onSubmitSearch() {
    var rs = await this._rickComplianceService.getProfessionalGroup(this.formProfessionalGroup);
    this.dataTable = rs.data;
  }
  async edit(item)
  {
    const dialogRef = this.dialog.open(EditProfessionalGroupComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
      this.onSubmitSearch();
    });
  }
  async add()
  {
    const dialogRef = this.dialog.open(AddProfessionalGroupComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
      this.onSubmitSearch();
    });
  }
}
