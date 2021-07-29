import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@/_helpers';
import { BrowseComplianceErrorLogComponent } from './risk-compliance/browse-compliance-error-log/browse-compliance-error-log.component';
import { RoleComponent } from './role';
import { ComplianceErrorRecordingComponent } from './risk-compliance/compliance-error-recording/compliance-error-recording.component';
import { BrowseForErrorCorrectionStatusUpdatesComponent } from './risk-compliance/browse-for-error-correction-status-updates/browse-for-error-correction-status-updates.component';
import { NotedErrorHandlingComponent } from './disciplinary-error/noted-error-handling/noted-error-handling.component';
import { BrowseDisciplinaryStatusUpdatesComponent } from './disciplinary-error/browse-disciplinary-status-updates/browse-disciplinary-status-updates.component';
import { ApprovedDisciplinaryErrorAcknowledgmentComponent } from './disciplinary-error/approved-disciplinary-error-acknowledgment/approved-disciplinary-error-acknowledgment.component';
import { RiskComplianceComponent } from './risk-compliance/risk-compliance.component';
import { EditComplianceErrorRecordingComponent } from './risk-compliance/edit-compliance-error-recording/edit-compliance-error-recording.component';
import { ViewComplianceErrorRecordingComponent } from './risk-compliance/view-compliance-error-recording/view-compliance-error-recording.component';
import { BusinessSegmentComponent } from './category/business-segment/business-segment.component';
import { ProfessionalGroupComponent } from './category/professional-group/professional-group.component';
import { ErrorGroupComponent } from './category/error-group/error-group.component';
import { ErrorDetailsComponent } from './category/error-details/error-details.component';
import { DisciplinaryOriginErrorComponent } from './category/disciplinary-origin-error/disciplinary-origin-error.component';
import { DisciplineComponent } from './category/discipline/discipline.component';
import { SeekDisciplinaryErrorComponent } from './disciplinary-error/seek-disciplinary-error.component';
import { BrowseServiceStatusUpdatesComponent } from './disciplinary-error';
import { ReportBCLTT04Component } from './report/report_bcltt04/report_bcltt04.component';
import { ReportBCLTT02Component } from './report/report_bcltt02/report_bcltt02.component';
import { ReportBCLTT01Component } from './report/report_bcltt01/report_bcltt01.component';
import { ReportBCLTT03Component } from './report/report_bcltt03/report_bcltt03.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'role', component: RoleComponent},
      { path: 'risk-compliance', component: RiskComplianceComponent},
      { path: 'compliance-error-recording', component: ComplianceErrorRecordingComponent},
      { path: 'edit-compliance-error-recording', component: EditComplianceErrorRecordingComponent },
      { path: 'view-compliance-error-recording', component: ViewComplianceErrorRecordingComponent },
      { path: 'browse-compliance-error-log', component: BrowseComplianceErrorLogComponent},
      { path: 'browse-for-error-correction-status-updates', component: BrowseForErrorCorrectionStatusUpdatesComponent},
      { path: 'noted-error-handling', component: NotedErrorHandlingComponent},
      { path: 'approved-disciplinary-error-acknowledgment', component: ApprovedDisciplinaryErrorAcknowledgmentComponent},
      { path: 'browse-disciplinary-status-updates', component: BrowseDisciplinaryStatusUpdatesComponent},
      { path: 'authen_role_barcode', component: RoleComponent},
      // danh muc (category)
      { path: 'category/business-segment', component: BusinessSegmentComponent},
      { path: 'category/professional-group', component: ProfessionalGroupComponent},
      { path: 'category/error-group', component: ErrorGroupComponent},
      { path: 'category/error-details', component: ErrorDetailsComponent},
      { path: 'category/disciplinary-origin-error', component: DisciplinaryOriginErrorComponent},
      { path: 'category/discipline', component: DisciplineComponent},
      // SeekDisciplinaryErrorComponent
      { path: 'seek-disciplinary-error', component: SeekDisciplinaryErrorComponent},
      { path: 'browse-service-status-updates', component: BrowseServiceStatusUpdatesComponent},
      // report
      { path: 'report_bcltt04', component: ReportBCLTT04Component},
      { path: 'report_bcltt03', component: ReportBCLTT03Component},
      { path: 'report_bcltt02', component: ReportBCLTT02Component},
      { path: 'report_bcltt01', component: ReportBCLTT01Component},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
