import { BranchModel } from "./branch.model";
import { CreatedDataModel } from "./created-data";

// export class BusinessSegmentModel {
//     id: string;
//     parent_id: string;
//     code: string;
//     name: string;
//     branch : BranchModel;
//     is_actived: number;
//     created_data: CreatedDataModel
// }
// export class ProfessionalGroupModel {
//     id: string;
//     parent: BusinessSegmentModel;
//     code: string;
//     name: string;
//     branch : BranchModel;
//     is_actived: number;
//     created_data: CreatedDataModel
// }
export class BusinessSegmentModel {
    id: string;
    code: string;
    name: string;
    branch: BranchModel;
    created_data: CreatedDataModel;
    is_actived: number;
}

export class ProfessionalGroupModel {
    id: string;
    parent: BusinessSegmentModel;
    code: string;
    name: string;
    created_data: CreatedDataModel;
    is_actived: number;
}