import { CreatedDataModel } from "./created-data";
import { ProfessionalGroupModel } from "./major.model";

// export class ErrorModel {
//     id: string;
//     parent_id: string;
//     code: string;
//     name: string;
//     description: string;
//     group_major: string;
// }
export class GroupErrorModel {
    id: string;
    parent_id: string;
    code: string;
    name: string;
    description: string;
    professional_group: ProfessionalGroupModel;
    created_data: CreatedDataModel;
    is_actived: number
}

// export class DetailErrorModel {
//     id: string;
//     parent: GroupErrorModel;
//     code: string;
//     name: string;
//     description: string;
//     is_actived: number
// }
export class DetailErrorModel {
    id: string;
    error_group: GroupErrorModel;
    code: string;
    name: string;
    description: string;
    rank_errors: string;
    violate: number;
    remind: string;
    criticize: string;
    warning: string;
    reprimand: string;
    dismissed: string;
    lay_off: string;
    adjustable_processing_method: string;
    standard_processing_process: string;
    suspend_work_to_verify_clarification: number;
    within_the_permitted_range: number;
    proportion_of_assessment_by_component: number;
    proportion_of_assessment_in_the_array: number;
    monitoring_results: number;
    tracking_remedy: number;
    created_data: CreatedDataModel;
    is_actived: number;
}