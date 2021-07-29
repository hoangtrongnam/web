import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@/_modules/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { ManagerRoutingModule } from './manager-routing.module';
import { AlertModule } from '@/_components/alert/alert.module';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OnlyNumberDirective } from '@/only-number.directive';
import { ComplianceErrorRecordingComponent } from './risk-compliance/compliance-error-recording/compliance-error-recording.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { RoleComponent } from './role';
import { BrowseComplianceErrorLogComponent } from './risk-compliance/browse-compliance-error-log/browse-compliance-error-log.component';
import { BrowseForErrorCorrectionStatusUpdatesComponent } from './risk-compliance/browse-for-error-correction-status-updates/browse-for-error-correction-status-updates.component';
import { NotedErrorHandlingComponent } from './disciplinary-error/noted-error-handling/noted-error-handling.component';
import { BrowseDisciplinaryStatusUpdatesComponent } from './disciplinary-error/browse-disciplinary-status-updates/browse-disciplinary-status-updates.component';
import { ApprovedDisciplinaryErrorAcknowledgmentComponent } from './disciplinary-error/approved-disciplinary-error-acknowledgment/approved-disciplinary-error-acknowledgment.component';
import { RiskComplianceComponent } from './risk-compliance/risk-compliance.component';
import { EditComplianceErrorRecordingComponent } from './risk-compliance/edit-compliance-error-recording/edit-compliance-error-recording.component';
import { ViewComplianceErrorRecordingComponent } from './risk-compliance/view-compliance-error-recording/view-compliance-error-recording.component';
import { BusinessSegmentComponent } from './category/business-segment/business-segment.component';
import { AddBusinessSegmentComponent, EditBusinessSegmentComponent } from './category/business-segment/dialog';
import { AddProfessionalGroupComponent, EditProfessionalGroupComponent } from './category/professional-group/dialog';
import { ProfessionalGroupComponent } from './category/professional-group/professional-group.component';
import { ErrorGroupComponent } from './category/error-group/error-group.component';
import { AddErrorGroupComponent, EditErrorGroupComponent } from './category/error-group/dialog';
import { ErrorDetailsComponent } from './category/error-details/error-details.component';
import { AddErrorDetailsComponent, EditErrorDetailsComponent, ViewErrorDetailsComponent } from './category/error-details/dialog';
import { DisciplinaryOriginErrorComponent } from './category/disciplinary-origin-error/disciplinary-origin-error.component';
import { DisciplineComponent } from './category/discipline/discipline.component';
import { AddDisciplinaryOriginErrorComponent, EditDisciplinaryOriginErrorComponent } from './category/disciplinary-origin-error/dialog';
import { AddDisciplineComponent, EditDisciplineComponent } from './category/discipline/dialog';
import { SeekDisciplinaryErrorComponent } from './disciplinary-error/seek-disciplinary-error.component';
import { AddIssueCorrectionStatusComponent, BrowseServiceStatusUpdatesComponent, EditNotedErrorHandlingComponent, ViewDisciplinaryStatusComponent, ViewIssueCorrectionStatusComponent, ViewNotedErrorHandlingComponent } from './disciplinary-error';
import { DialogComplianceErrorRecordingComponent } from './risk-compliance';
import { AddDisciplinaryStatusComponent } from './disciplinary-error/dialog/add_disciplinary_status/add-disciplinary-status.component';
import { ReportBCLTT04Component } from './report/report_bcltt04/report_bcltt04.component';
import { ReportBCLTT01Component } from './report/report_bcltt01/report_bcltt01.component';
import { ReportBCLTT02Component } from './report/report_bcltt02/report_bcltt02.component';
import { ReportBCLTT03Component } from './report/report_bcltt03/report_bcltt03.component';

@NgModule({
    imports: [
        OrderModule,
        CommonModule,
        CurrencyMaskModule,
        FormsModule,
        MaterialModule,
        ManagerRoutingModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
        FileUploadModule,
        AlertModule,
        NgxSpinnerModule,
        NgSelectModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.circleSwish,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        }),
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    exports: [
        RoleComponent,
        EditBusinessSegmentComponent,
        AddBusinessSegmentComponent,
        AddProfessionalGroupComponent,
        EditProfessionalGroupComponent,
        ProfessionalGroupComponent,
        ErrorDetailsComponent,
        DisciplinaryOriginErrorComponent,
        DisciplineComponent,
        AddDisciplineComponent,
        AddErrorDetailsComponent,
        EditErrorDetailsComponent,
        EditDisciplineComponent,
        EditNotedErrorHandlingComponent,
        ViewNotedErrorHandlingComponent,
        DialogComplianceErrorRecordingComponent,
        AddDisciplinaryStatusComponent,
        ViewDisciplinaryStatusComponent,
        // CreateCategoryComponent,
        RiskComplianceComponent,
        ComplianceErrorRecordingComponent,
        EditComplianceErrorRecordingComponent,
        ViewComplianceErrorRecordingComponent,
        BrowseComplianceErrorLogComponent,
        BrowseForErrorCorrectionStatusUpdatesComponent,
        NotedErrorHandlingComponent,
        ApprovedDisciplinaryErrorAcknowledgmentComponent,
        BrowseDisciplinaryStatusUpdatesComponent,
        ErrorGroupComponent,
        AddErrorGroupComponent,
        EditErrorGroupComponent,
        AddIssueCorrectionStatusComponent,
        ViewIssueCorrectionStatusComponent,
        // DetailCategoryComponent,
        OnlyNumberDirective,
        // danh muc
        BusinessSegmentComponent,
        SeekDisciplinaryErrorComponent,
        EditDisciplinaryOriginErrorComponent,
        AddDisciplinaryOriginErrorComponent,
        BrowseServiceStatusUpdatesComponent,
        ReportBCLTT04Component,
        ReportBCLTT03Component,
        ReportBCLTT02Component,
        ReportBCLTT01Component,
        ViewErrorDetailsComponent
    ],
    declarations: [
        RoleComponent,
        EditBusinessSegmentComponent,
        AddBusinessSegmentComponent,
        AddProfessionalGroupComponent,
        EditProfessionalGroupComponent,
        ProfessionalGroupComponent,
        ErrorDetailsComponent,
        AddDisciplineComponent,
        AddDisciplinaryStatusComponent,
        AddErrorDetailsComponent,
        EditDisciplineComponent,
        EditNotedErrorHandlingComponent,
        ViewNotedErrorHandlingComponent,
        DialogComplianceErrorRecordingComponent,
        ViewDisciplinaryStatusComponent,
        // CreateCategoryComponent,
        RiskComplianceComponent,
        ComplianceErrorRecordingComponent,
        EditComplianceErrorRecordingComponent,
        ViewComplianceErrorRecordingComponent,
        BrowseComplianceErrorLogComponent,
        BrowseForErrorCorrectionStatusUpdatesComponent,
        DisciplinaryOriginErrorComponent,
        DisciplineComponent,
        NotedErrorHandlingComponent,
        ApprovedDisciplinaryErrorAcknowledgmentComponent,
        BrowseDisciplinaryStatusUpdatesComponent,
        ErrorGroupComponent,
        AddErrorGroupComponent,
        EditErrorGroupComponent,
        EditErrorDetailsComponent,
        SeekDisciplinaryErrorComponent,
        AddIssueCorrectionStatusComponent,
        ViewIssueCorrectionStatusComponent,
        // DetailCategoryComponent,
        OnlyNumberDirective,
        // danh muc
        BusinessSegmentComponent,
        EditDisciplinaryOriginErrorComponent,
        AddDisciplinaryOriginErrorComponent,
        BrowseServiceStatusUpdatesComponent,
        ReportBCLTT04Component,
        ReportBCLTT03Component,
        ReportBCLTT02Component,
        ReportBCLTT01Component,
        ViewErrorDetailsComponent
    ],
    entryComponents: [
        RoleComponent,
        EditBusinessSegmentComponent,
        AddBusinessSegmentComponent,
        AddProfessionalGroupComponent,
        EditProfessionalGroupComponent,
        AddErrorGroupComponent,
        AddDisciplineComponent,
        EditDisciplineComponent,
        EditErrorGroupComponent,
        AddErrorDetailsComponent,
        EditErrorDetailsComponent,
        EditDisciplinaryOriginErrorComponent,
        AddDisciplinaryOriginErrorComponent,
        EditNotedErrorHandlingComponent,
        AddIssueCorrectionStatusComponent,
        ViewNotedErrorHandlingComponent,
        DialogComplianceErrorRecordingComponent,
        AddDisciplinaryStatusComponent,
        ViewDisciplinaryStatusComponent,
        ViewIssueCorrectionStatusComponent,
        ViewErrorDetailsComponent
        // DetailCategoryComponent
    ]
})
export class ManagerModule { }
