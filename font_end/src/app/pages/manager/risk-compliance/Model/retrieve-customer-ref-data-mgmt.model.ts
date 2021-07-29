export class RetrieveCustomerRefDataMgmtInModel {
    retrievecustomerrefdatamgmt_in: RetrieveCustomerRefDataMgmtIn;
}

export class CIFInfoIn {
    cifnum: string;
}

export class TransactionInfoIn {
    clientcode: string;
    crefnum: string;
    branchinfo: BranchInfo;
}

export class RetrieveCustomerRefDataMgmtIn {
    transactioninfo: TransactionInfoIn;
    cifinfo: CIFInfo;
}

export class RetrieveCustomerRefDataMgmtOutModel {
    retrievecustomerrefdatamgmt_out: RetrieveCustomerRefDataMgmtOut;
}

export class RetrieveCustomerRefDataMgmtOut {
    transactioninfo: TransactionInfo;
    cifinfo: CIFInfo;
    customerinfo: CustomerInfo;
}

export class BranchInfo {
    branchcode: string;
}

export class TransactionInfo {
    crefnum: string;
    prefnum: string;
    transactionstarttime: string;
    transactioncompletedtime: string;
    transactionreturn: number;
    transactionreturnmsg: string;
    branchinfo: BranchInfo;
}

export class CIFInfo {
    cifnum: string;
    cifissueddate: string;
    branchcode: string;
    customertype: string;
}

export class JobInfo {
    professionalname: string;
    professionalcode: string;
}

export class DInfo {
    idnum: string;
    idissueddate: string;
    idissuedlocation: string;
}

export class Address {
    address1: string;
    address_vn: string;
    email: string;
    mobilenum: string;
    telephonenum: string;
    phonenum: string;
    faxnum: string;
}

export class CustomerInfo {
    fullname: string;
    fullname_vn: string;
    birthday: string;
    gender: string;
    customerviptype: string;
    managestaffid: string;
    recordstatus: string;
    authstatus: string;
    usindicia: string;
    directorname: string;
    nationlitycode: string;
    nationlity: string;
    emaillist: string;
    feedebt: string;
    isstaff: string;
    segmenttype: string;
    jobinfo: JobInfo;
    idinfo: DInfo;
    address: Address;
}