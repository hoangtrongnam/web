import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusModel } from '../../risk-compliance/Model/status.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from '../../risk-compliance/Model/major.model';
import { RickComplianceService } from '@/_services/risk-compliance.service';
import { BranchModel } from '../../risk-compliance/Model/branch.model';
import { MatDialog } from '@angular/material/dialog';
import { DetailErrorModel, GroupErrorModel } from '../../risk-compliance/Model/error.model';
import { DisciplineErrorService } from '@/_services/disciplinary-error.service';
import { FormOfDisciplineModel } from '../../disciplinary-error/Models/form-of-discipline.model';
import { AddDisciplineComponent, EditDisciplineComponent } from './dialog';
@Component({
  selector: 'app-error-details',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.css']
})
export class DisciplineComponent implements OnInit {
  status: StatusModel;
  dataTable: FormOfDisciplineModel[];
  formDetailsError: FormOfDisciplineModel;
  rq_dropList: BusinessSegmentModel;
  constructor(
    private _disciplineErrorService: DisciplineErrorService,
    private notifierService: NotifierService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formDetailsError = new FormOfDisciplineModel();
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
    var rs = await this._disciplineErrorService.getFormOfDiscipline(this.formDetailsError);
    this.dataTable = rs.data;
    console.log(this.dataTable)
  }
  async edit(item)
  {
    const dialogRef = this.dialog.open(EditDisciplineComponent, {
      width: '600px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
  async add()
  {
    const dialogRef = this.dialog.open(AddDisciplineComponent, {
      width: '1200px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initData();
    });
  }
}

