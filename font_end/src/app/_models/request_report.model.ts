import { BranchModel } from "@/pages/manager/risk-compliance/Model/branch.model";
import { ProfessionalGroupModel } from "@/pages/manager/risk-compliance/Model/major.model";
import { StatusModel } from "@/pages/manager/risk-compliance/Model/status.model";

export class RequestReportBCLTTModel {
    startDate: string | null;
    endDate: string | null;
    branch: BranchModel;
}

export class RequestReportBCLTT01Model {
    startDate: string | null;
    endDate: string | null;
    correctiveStatus: StatusModel;
    statusApproved: StatusModel;
    professionalGroup: ProfessionalGroupModel;
    branch: BranchModel;
}