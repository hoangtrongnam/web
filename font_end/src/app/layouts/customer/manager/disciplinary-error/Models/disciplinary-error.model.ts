import { BranchModel } from "../../risk-compliance/Model/branch.model";
import { DocumentModel } from "../../risk-compliance/Model/document.model";
import { StatusModel } from "../../risk-compliance/Model/status.model";
import { DetailIssueModel } from "./detail-issue.model";
import { DisciplinaryOriginErrorModel } from "./disciplinary-origin-error.model";
import { DisciplinaryStatusModel } from "./disciplinary-status-model";
import { IssueCorrectionStatusModel } from "./issue-correction-status.model";

export class DisciplinaryErrorModel {
    id: string;
    code: string;
    date_of_record: string;
    unit_request: BranchModel;
    error: DisciplinaryOriginErrorModel;
    description: string;
    detail_issue: DetailIssueModel;
    issue_correction_status: IssueCorrectionStatusModel;
    disciplinary_status: DisciplinaryStatusModel;
    noted: string;
    approved: StatusModel;
}