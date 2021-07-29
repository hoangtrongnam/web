import { CreatedDataModel } from "../../risk-compliance/Model/created-data";

export class FormOfDisciplineModel {
    id: string;
    form_of_discipline: string;
    minus_point: string;
    created_date: CreatedDataModel;
    is_actived: number;
}