import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { BusinessSegmentModel } from '../../risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { MatDialog } from '@angular/material/dialog';
import { AddBusinessSegmentComponent, EditBusinessSegmentComponent } from './dialog';

@Component({
  selector: 'app-business-segment',
  templateUrl: './business-segment.component.html',
  styleUrls: ['./business-segment.component.css']
})
export class BusinessSegmentComponent implements OnInit {
  status: StatusModel;
  dataTable: BusinessSegmentModel[];
  formMajor: BusinessSegmentModel;
  branch: BranchModel;
  branchAll: BranchModel;
  constructor(
    private _rickComplianceService: RickComplianceService,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formMajor = new BusinessSegmentModel()
    // this.formMajor.parent_id = "1";
    this.branchAll = new BranchModel();
    this.branchAll.id = null;
    this.branchAll.branch_code = "-1";
    this.branchAll.branch_name = "Tất cả";
  }

  ngOnInit() {
    this.initData();
  }
  async initData() {
    this.branch = new BranchModel();
    this.branch.flag = "2";
    var rs_branch = await this._rickComplianceService.GetBranch(this.branch);
    this.branch = rs_branch.data;
    this.onSubmitSearch();
  }
  async onSelectArrayMajor(event, item) {
  }
  async onSubmitSearch() {
    var rs = await this._rickComplianceService.GetBusinessSegment(this.formMajor);
    this.dataTable = rs.data;
  }
  async edit(item)
  {
    const dialogRef = this.dialog.open(EditBusinessSegmentComponent, {
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
    const dialogRef = this.dialog.open(AddBusinessSegmentComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
      this.onSubmitSearch();
    });
  }
}
