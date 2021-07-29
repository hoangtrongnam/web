
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { BusinessSegmentModel, ProfessionalGroupModel } from '@/pages/manager/risk-compliance/Model/major.model';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { StaffModel } from '@/pages/manager/risk-compliance/Model/staff.model';
import { CorrectiveInfoModel } from '@/pages/manager/risk-compliance/Model/corrective-info.model';
import { StatusModel } from '@/pages/manager/risk-compliance/Model/status.model';
import { FormRiskComplianceModel, RiskComplianceModel } from '@/pages/manager/risk-compliance/Model/risk-compliance.model';
import { List } from 'linq-typescript';
import { DetailErrorModel, GroupErrorModel } from '@/pages/manager/risk-compliance/Model/error.model';
import { RetrieveCustomerRefDataMgmtIn } from '@/pages/manager/risk-compliance/Model/retrieve-customer-ref-data-mgmt.model';


@Injectable({ providedIn: 'root' })
export class RickComplianceService {

    constructor(private http: HttpClient) {
    }

    GetBranch(request: BranchModel = new BranchModel) {
        return this.http.post<any>(`${environment.apiUrl}/branch/get`, request).toPromise();
    }
    ///ProfessionalGroup
    insertProfessionalGroup(request: ProfessionalGroupModel = new ProfessionalGroupModel) {
        return this.http.post<any>(`${environment.apiUrl}/major/insert_professional_group`, request).toPromise();
    }
    getProfessionalGroup(request: ProfessionalGroupModel = new ProfessionalGroupModel) {
        return this.http.post<any>(`${environment.apiUrl}/major/get_professional_group`, request).toPromise();
    }
    updateProfessionalGroup(request: ProfessionalGroupModel = new ProfessionalGroupModel) {
        return this.http.post<any>(`${environment.apiUrl}/major/update_professional_group`, request).toPromise();
    }
    // Business Segment
    GetBusinessSegment(request: BusinessSegmentModel = new BusinessSegmentModel) {
        return this.http.post<any>(`${environment.apiUrl}/major/get_major`, request).toPromise();
    }
    InsertBusinessSegment(request: BusinessSegmentModel = new BusinessSegmentModel) {
        return this.http.post<any>(`${environment.apiUrl}/major/insert_major`, request).toPromise();
    }
    UpdateBusinessSegment(request: BusinessSegmentModel = new BusinessSegmentModel) {
        return this.http.post<any>(`${environment.apiUrl}/major/update_major`, request).toPromise();
    }
    // group error
    insertGroupError(request: GroupErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/error/insert_group_error`, request).toPromise();
    }
    getGroupError(request: GroupErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/error/get_group_error`, request).toPromise();
    }
    updateGroupError(request: GroupErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/error/update_group_error`, request).toPromise();
    }
    // error detail
    getDetailError(request: DetailErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/error/get_detail_error`, request).toPromise();
    }
    insertDetailError(request: DetailErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/error/insert_detail_error`, request).toPromise();
    }
    updateDetailError(request: DetailErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/error/update_detail_error`, request).toPromise();
    }

    GetCorrectiveInfo(request: CorrectiveInfoModel = new CorrectiveInfoModel) {
        return this.http.post<any>(`${environment.apiUrl}/correctiveinfo/get`, request).toPromise();
    }
    GetStatus(request: StatusModel = new StatusModel) {
        return this.http.post<any>(`${environment.apiUrl}/status/get`, request).toPromise();
    }
    GetHrInfoUser(request: StaffModel) {
        return this.http.post<any>(`${environment.apiUrl}/account/get_hr_info_user`, request).toPromise();
    }
    UploadFileRiskCompliance(data: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/riskcompliance/upload_risk_compliance`, data).toPromise();
    }
    InsertRickCompliance(request: RiskComplianceModel) {
        return this.http.post<any>(`${environment.apiUrl}/riskcompliance/insert`, request).toPromise();
    }
    getRickCompliance(request: RiskComplianceModel) {
        return this.http.post<any>(`${environment.apiUrl}/riskcompliance/get`, request).toPromise();
    }
    UploadRickCompliance(request:RiskComplianceModel[]) {
        return this.http.post<any>(`${environment.apiUrl}/riskcompliance/update`,request).toPromise();
    }
    DeletedRickCompliance(request:RiskComplianceModel) {
        return this.http.post<any>(`${environment.apiUrl}/riskcompliance/deleted`,request).toPromise();
    }
    getRetrieveCustomerRefDataMgmt(request:RetrieveCustomerRefDataMgmtIn) {
        return this.http.post<any>(`${environment.apiUrl}/customer/retrieveCustomerRefDataMgmt`,request).toPromise();
    }
}