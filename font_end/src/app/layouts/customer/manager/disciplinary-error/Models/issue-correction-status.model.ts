import { StatusModel } from "../../risk-compliance/Model/status.model";

export class IssueCorrectionStatusModel {
    id: string;
    status: StatusModel;
    finish_day: string;
    note: string;
    file_name: string;
    file_type: string;
    file_contents: string;
    approved : StatusModel;
}