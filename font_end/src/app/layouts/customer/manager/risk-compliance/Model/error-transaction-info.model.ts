import { BranchModel } from "./branch.model";
export class FormErrorTransactionInfoModel {
    id: string;
    cif_custom_code: string;
    account_number: string;
    transaction_number: string;
    transaction_amount: string;
    the_amount_of_the_loss: string;
    date_incurred: string;
    branch: BranchModel;
    constructor(
    id: string,
    cif_custom_code: string,
    account_number: string,
    transaction_number: string,
    transaction_amount: string,
    the_amount_of_the_loss: string,
    date_incurred: Date,
    branch: BranchModel,
    ){}
}

export class ErrorTransactionInfoModel {
    id: string;
    cif_custom_code: string;
    cif_custom_name: string;
    account_number: string;
    transaction_number: string;
    transaction_amount: string;
    the_amount_of_the_loss: string;
    date_incurred: Date;
    branch: BranchModel;
}