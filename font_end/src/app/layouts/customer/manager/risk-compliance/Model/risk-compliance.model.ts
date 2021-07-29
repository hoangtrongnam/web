import { BranchModel } from './branch.model';
import { CorrectiveInfoModel, FormCorrectiveInfoModel } from './corrective-info.model';
import { DocumentModel } from './document.model';
import { ErrorTransactionInfoModel, FormErrorTransactionInfoModel } from './error-transaction-info.model';
import { DetailErrorModel, GroupErrorModel } from './error.model';
import { BusinessSegmentModel, ProfessionalGroupModel } from './major.model';
import { StaffModel } from './staff.model';
import { StatusModel } from './status.model';

export class FormRiskComplianceModel {
    staff: StaffModel[];
    document: DocumentModel;
    error_transaction_info: FormErrorTransactionInfoModel;
    noted_staff: StaffModel;
    corrective_status: FormCorrectiveInfoModel;
    constructor(
        id: string,
        code: string,
        noted_staff: StaffModel,
        branch: BranchModel,
        created_date: Date,
        duration: Date,
        business_segment: BusinessSegmentModel,
        group_business_segment: ProfessionalGroupModel,
        detail_error: DetailErrorModel,
        group_error: GroupErrorModel,
        description: string,
        document: DocumentModel,
        error_transaction_info: FormErrorTransactionInfoModel,
        staff: StaffModel[],
        corrective_status: CorrectiveInfoModel,
        approved_status: StatusModel
    ) { }
}
// export class RiskComplianceModel {
//     id: string;
//     code: string;
//     branch: BranchModel;
//     created_date: Date;
//     duration: Date;
//     business_segment: BusinessSegmentModel;
//     group_business_segment: ProfessionalGroupModel;
//     detail_error: DetailErrorModel;
//     group_error: GroupErrorModel;
//     description: string;
//     document: DocumentModel;
//     error_transaction_info: ErrorTransactionInfoModel;
//     staff: StaffModel[];
//     corrective_status: CorrectiveInfoModel;
//     approved_status: StatusModel
// }
export class RiskComplianceModel {
    id: string;
    code: string;
    branch: BranchModel;
    noted_staff: StaffModel;
    created_date: Date;
    duration: string;
    detail_error: DetailErrorModel;
    description: string;
    document: DocumentModel;
    error_transaction_info: ErrorTransactionInfoModel;
    staff: StaffModel[];
    corrective_status: CorrectiveInfoModel;
    approved_status: StatusModel;
    user_created: string;
    user_update: string;
    user_delete: string;
    is_actived: string;
}