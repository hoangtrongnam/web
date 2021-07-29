import { StatusModel } from "./status.model";

export class FormCorrectiveInfoModel {
    file_name: any;
    file_contents: any;
    file_type: any;
    constructor(
        id: string,
        status: StatusModel,
        finish_day: string,
        note: string,
        file_name: string,
        file_type: string,
        file_contents: string,
    ) { }
}

export class CorrectiveInfoModel {
    id: string;
    status: StatusModel;
    finish_day: Date;
    note: string;
    file_name: string;
    file_type: string;
    file_contents: string;
    approved : StatusModel;
}