import { CategoryModel, Status } from ".";

export class PackageModel {
  rid: number;
  goi_id: number;
  tengoi: string;
  sott: number;
  mavach_goi: string;
  ngaygd: Date;
  category: CategoryModel;
  created_date: Date;
  user_created: string;
  modified_date: Date;
  user_modified: string;
  deleted_date: Date;
  user_deleted: string;
  status: Status;
  seri_from: string;
  seri_to: string;
  description: string;
  soluong: number;
  trangthai_nx: Status;
  trangthai_sd: Status;
  thung_id : number;
  action : string;
}