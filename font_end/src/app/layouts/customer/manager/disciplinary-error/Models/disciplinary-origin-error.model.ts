import { CreatedDataModel } from "../../risk-compliance/Model/created-data";

export class DisciplinaryOriginErrorModel {
    id: string;
    code: string;
    name: string;
    created_data: CreatedDataModel;
    is_actived: number;
}