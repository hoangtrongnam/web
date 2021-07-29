import { List } from "linq-typescript";
import { BranchModel } from "../../risk-compliance/Model/branch.model";
// import { StaffModel } from "../../risk-compliance/Model/staff.model";
import { StaffFormOfDisciplineModel } from "./staff-form-of-discipline.model";

export class DetailIssueModel {
    id: string;
    date_incurred: string;
    unit_incurred: BranchModel;
    news_sources: string;
    cif_customer: string;
    full_name_customer: string;
    amount_involved: number;
    loss_of_money: number;
    staff_form_of_discipline: StaffFormOfDisciplineModel[];
}