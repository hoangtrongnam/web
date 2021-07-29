import { Status } from ".";

export class ACQTModel {
    acqt_id?: number;
    ten_acqt: string;
    danhmuc_id: number;
    soseri: string;
    sott: string;
    mavach_acqt: string;
    trangthai_sd: Status;
    ngaygd: Date;
    created_date: Date;
    user_created: string;
    modified_date: Date;
    deleted_date: Date;
    status: Status;
    trangthai_nx: Status;
    user_modified: string;
    user_deleted: string;
    action: string;
}
