export class MenuModel {
    id: string;
    parentId: string;
    name: string;
    url: string;
    menus: MenuModel[];
    actionids: string[];
}