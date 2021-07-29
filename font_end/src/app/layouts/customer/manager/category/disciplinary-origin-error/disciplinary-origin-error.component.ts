import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../../risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { MatDialog } from '@angular/material/dialog';
import { AddDisciplinaryOriginErrorComponent, EditDisciplinaryOriginErrorComponent } from './dialog';
import { DetailErrorModel, GroupErrorModel } from '../../risk-compliance/Model/error.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { DisciplinaryOriginErrorModel } from '../../disciplinary-error/Models/disciplinary-origin-error.model';
@Component({
  selector: 'app-disciplinary-origin-error',
  templateUrl: './disciplinary-origin-error.component.html',
  styleUrls: ['./disciplinary-origin-error.component.css']
})
export class DisciplinaryOriginErrorComponent implements OnInit {
  status: StatusModel;
  dataTable: DisciplinaryOriginErrorModel[];
  formDisciplinaryOriginError: DisciplinaryOriginErrorModel;
  rq_dropList: BusinessSegmentModel;
  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formDisciplinaryOriginError = new DisciplinaryOriginErrorModel();
  }

  ngOnInit() {
    this.initData();
  }
  async initData() {
    this.onSubmitSearch();
  }
  async onSelectArrayMajor(event, item) {
  }
  async onSubmitSearch() {
    var rs = await this._disciplineErrorService.getDisciplinaryOriginError(this.formDisciplinaryOriginError);
    this.dataTable = rs.data;
    console.log(this.dataTable)
  }
  async edit(item)
  {
    const dialogRef = this.dialog.open(EditDisciplinaryOriginErrorComponent, {
      width: '600px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async add()
  {
    const dialogRef = this.dialog.open(AddDisciplinaryOriginErrorComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
}

