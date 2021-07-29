import { DocumentModel } from "../../risk-compliance/Model/document.model";
import { StatusModel } from "../../risk-compliance/Model/status.model";

export class DisciplinaryStatusModel {
    id: string;
    status: StatusModel;
    document: DocumentModel;
    note: string;
    approved: StatusModel;
}