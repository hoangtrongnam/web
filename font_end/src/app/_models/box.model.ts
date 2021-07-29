import { Status, CategoryModel, PackageModel } from ".";
import { List } from "linq-typescript";

export class BoxModel {
    thung_id:number
    tenthung : string;
    sott :string;
    mavach_thung :	string;
    ngaygd:	Date;
    category:	CategoryModel;
    created_date:	Date;
    user_created:	string;
    modified_date:	Date;
    user_modified:	string;
    deleted_date:	Date;
    user_deleted:	string;
    status:	Status;
    soluong:	number;
    trangthai_nx:	Status;
    action: string;
    
}
export class RequestBoxModel
{
    goi_id : string;
    danhmuc_id : number;
    loai_acqt : string;
    tenthung : string;
    status : Status;
    trangthai_nx : Status;
    listSeriPackage : string;
    package: List<PackageModel>;
}