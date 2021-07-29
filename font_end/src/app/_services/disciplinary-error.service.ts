

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BranchModel } from '@/pages/manager/risk-compliance/Model/branch.model';
import { DisciplinaryOriginErrorModel } from '@/pages/manager/disciplinary-error/Models/disciplinary-origin-error.model';
import { FormOfDisciplineModel } from '@/pages/manager/disciplinary-error/Models/form-of-discipline.model';
import { DisciplinaryErrorModel } from '@/pages/manager/disciplinary-error/Models/disciplinary-error.model';
import { DisciplinaryStatusModel } from '@/pages/manager/disciplinary-error/Models/disciplinary-status-model';
import { IssueCorrectionStatusModel } from '@/pages/manager/disciplinary-error/Models/issue-correction-status.model';


@Injectable({ providedIn: 'root' })
export class DisciplineErrorService {
    constructor(private http: HttpClient) {
    }
    // Form Of Discipline
    insertFormOfDiscipline(request: FormOfDisciplineModel = new FormOfDisciplineModel) {
        return this.http.post<any>(`${environment.apiUrl}/formOfDiscipline/insert`, request).toPromise();
    }
    getFormOfDiscipline(request: FormOfDisciplineModel = new FormOfDisciplineModel) {
        return this.http.post<any>(`${environment.apiUrl}/formOfDiscipline/get`, request).toPromise();
    }
    updateFormOfDiscipline(request: FormOfDisciplineModel = new FormOfDisciplineModel) {
        return this.http.post<any>(`${environment.apiUrl}/formOfDiscipline/update`, request).toPromise();
    }
    // Disciplinary Origin Error
    insertDisciplinaryOriginError(request: DisciplinaryOriginErrorModel = new DisciplinaryOriginErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryOriginError/insert`, request).toPromise();
    }
    getDisciplinaryOriginError(request: DisciplinaryOriginErrorModel = new DisciplinaryOriginErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryOriginError/get`, request).toPromise();
    }
    updateDisciplinaryOriginError(request: DisciplinaryOriginErrorModel = new DisciplinaryOriginErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryOriginError/update`, request).toPromise();
    }
    // Disciplinary Error
    insertDisciplinaryError(request: DisciplinaryErrorModel = new DisciplinaryErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryError/insert`, request).toPromise();
    }
    getDisciplinaryError(request: DisciplinaryErrorModel = new DisciplinaryErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryError/get`, request).toPromise();
    }
    updateDisciplinaryError(request: DisciplinaryErrorModel = new DisciplinaryErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryError/update`, request).toPromise();
    }
    updateListDisciplinaryError(request: DisciplinaryErrorModel[]) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryError/update_list`, request).toPromise();
    }
    updateListDisciplinaryStatus(request: DisciplinaryErrorModel[]) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryStatus/update_disciplinary_status`, request).toPromise();
    }
    updateListIssueCorrectionStatus(request: DisciplinaryErrorModel[]) {
        return this.http.post<any>(`${environment.apiUrl}/issueCorrectionStatus/update_issue_correction_status`, request).toPromise();
    }
    deletedDisciplinaryError(request:DisciplinaryErrorModel) {
        return this.http.post<any>(`${environment.apiUrl}/disciplinaryError/deleted`,request).toPromise();
    }
}