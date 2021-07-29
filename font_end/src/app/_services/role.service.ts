import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { List } from 'linq-typescript';

@Injectable({ providedIn: 'root' })
export class RoleService {

    constructor(private http: HttpClient) {
    }

    getDefine() {
        return this.http.post<any>(`${environment.apiUrl}/role/getdefineauths`,{}).toPromise();
    }

    getMenuByRole(role:string) {
        return this.http.get<any>(`${environment.apiUrl}/role/getmenubyrole`,{ params: { role: role }}).toPromise();
    }

    setData(datas: any[]) {
        return this.http.post<any>(`${environment.apiUrl}/role/setdata`,{ datas: datas }).toPromise();
    }
    

    async getPermit(url: string){
        var menus = new List<any>(JSON.parse(localStorage.getItem('menus')));
        var roleId = JSON.parse(localStorage.getItem('currentUser')).info.role;
        var permits = menus.first(s=>s.url === url).permit;
        var treePermit = this.loadTreePermit(permits);

        var auths = await this.http.get<any[]>("./assets/auth.json").toPromise();
        var auth = (new List<any>(auths).first(w=>w.roleId === roleId));
        Object.keys(auth.permit).forEach(key=>{
            treePermit[key] = auth.permit[key];
        })
        
        return treePermit;
    }
    private loadTreePermit(nodes : any[]){
        var permit = {};
        nodes.forEach(node => {
            if(node.parentId === null){
                permit[node.action] = {
                    permit_id: node.id,
                    permit_parentId: node.parentId,
                    //name : node.name,
                    isshow : true
                };
                var item = permit[node.action];
                this.getChirentPermit(item, nodes);
            }
        });
        return permit;
    }
    private getChirentPermit(permit : any, nodes : any[]){
        nodes.forEach(node => {
            if(permit.permit_id === node.parentId){
                permit[node.action] = {
                    permit_id: node.id,
                    permit_parentId: node.parentId,
                    //name : node.name,
                    isshow : true
                };
                var item = permit[node.action];
                this.getChirentPermit(item, nodes);
            }
        });
    }
}