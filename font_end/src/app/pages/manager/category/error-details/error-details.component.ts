import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../../risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { MatDialog } from '@angular/material/dialog';
import { AddErrorDetailsComponent, EditErrorDetailsComponent, ViewErrorDetailsComponent } from './dialog';
import { DetailErrorModel, GroupErrorModel } from '../../risk-compliance/Model/error.model';
@Component({
  selector: 'app-error-details',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.css']
})
export class ErrorDetailsComponent implements OnInit {
  status: StatusModel;
  dataTable: GroupErrorModel[];
  formDetailsError: DetailErrorModel;
  rq_dropList: BusinessSegmentModel;
  BusinessSegmentAll: BusinessSegmentModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formDetailsError = new DetailErrorModel();
    this.formDetailsError.error_group = new GroupErrorModel(),
    this.formDetailsError.error_group.professional_group = new ProfessionalGroupModel();
    this.formDetailsError.error_group.professional_group.parent = new BusinessSegmentModel();
    
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
    var rs_dropList = await this._rickComplianceService.GetBusinessSegment(this.rq_dropList);
    this.rq_dropList = rs_dropList.data;
    this.formDetailsError.error_group.professional_group.parent = this.BusinessSegmentAll;//this.rq_dropList[0];
    this.onSubmitSearch();
  }
  async onSelectArrayMajor(event, item) {
  }
  async onSubmitSearch() {
    var rs = await this._rickComplianceService.getDetailError(this.formDetailsError);
    this.dataTable = rs.data;
  }
  async view(item)
  {
    const dialogRef = this.dialog.open(ViewErrorDetailsComponent, {
      width: '600px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async edit(item)
  {
    const dialogRef = this.dialog.open(EditErrorDetailsComponent, {
      width: '600px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async add()
  {
    const dialogRef = this.dialog.open(AddErrorDetailsComponent, {
      width: '1200px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
}

