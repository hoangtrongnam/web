import { CreatedDataModel } from "../../risk-compliance/Model/created-data";
import { StaffModel } from "../../risk-compliance/Model/staff.model";
import { FormOfDisciplineModel } from "./form-of-discipline.model";

export class StaffFormOfDisciplineModel {
    id: string;
    staff: StaffModel;
    form_of_discipline: FormOfDisciplineModel;
    created_data: CreatedDataModel;
    is_actived: string;
    detail_issue: string;
}