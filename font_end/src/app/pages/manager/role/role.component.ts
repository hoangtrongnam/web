import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { RoleService, NotifierService } from '@/_services';
import { List } from 'linq-typescript';
import { strictEqual } from 'assert';

declare var $: any;

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children?: TodoItemNode[];
  id: string;
  name: string;
  description?: string;

  permits?: TodoItemNode[];

  isSelected: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  id: string;
  name: string;
  description?: string;

  level: number;
  expandable: boolean;

  permits?: TodoItemNode[];
  isSelected: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};


/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataMenuChange = new BehaviorSubject<TodoItemNode[]>([]);
  dataPermitChange = new BehaviorSubject<TodoItemNode[]>([]);
  dataRoleChange = new BehaviorSubject<TodoItemNode[]>([]);

  get dataMenu(): TodoItemNode[] { return this.dataMenuChange.value; }
  get dataPermit(): TodoItemNode[] { return this.dataPermitChange.value; }
  get dataRoles(): TodoItemNode[] { return this.dataRoleChange.value; }

  constructor(
    private roleService: RoleService) {
    this.initialize();
  }

  async initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.

    var def = await this.roleService.getDefine();
    debugger
    def.data.menus.forEach(menu => {
      menu.permits = def.data.permits;
    });

    var dataMenu = this.buildFileTree(def.data.menus, 0);
    var dataPermit = this.buildFileTree(def.data.permits, 0);
    var dataRoles = def.data.roles;
    // Notify the change.
    this.dataMenuChange.next(dataMenu);

    // Notify the change.
    this.dataPermitChange.next(dataPermit);

    // Notify the change.
    this.dataRoleChange.next(dataRoles);
  }

  /**
   * *
   */
  getParentTree(datas: [], currentNode: TodoItemNode, level: number) {
    currentNode.children = new Array<TodoItemNode>();
    datas.forEach((data: any) => {
      if (data.parentid === currentNode.id) {
        const node = new TodoItemNode();
        node.id = data.id;
        node.name = data.name;
        if (data.permits) {
          node.permits = [];
          data.permits.forEach(permit => {
            var p = { id: permit.id, name: permit.name, isSelected: false, onChecked: function (node, ev) { node.isSelected = ev.checked } };
            node.permits.push(p)
          });
        }
        this.getParentTree(datas, node, level + 1);
        currentNode.children.push(node);
      }
    });
    if (currentNode.children.length === 0) {
      delete currentNode.children;
    }
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(datas: [], level: number): TodoItemNode[] {
    debugger
    var rs = new Array<TodoItemNode>();
    datas.forEach((data: any) => {
      if (data.parentid === null || data.parentid === undefined || data.parentid == "") {
        const node = new TodoItemNode();
        node.id = data.id;
        node.name = data.name;
        if (data.permits) {
          node.permits = [];
          data.permits.forEach(permit => {
            node.permits.push({ id: permit.id, name: permit.name, isSelected: false })
          });
        }
        this.getParentTree(datas, node, level + 1);
        return rs.push(node);
      }
    });
    return rs;
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ id: name } as TodoItemNode);
      this.dataMenuChange.next(this.dataMenu);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.id = name;
    this.dataMenuChange.next(this.dataMenu);
  }
}


/**
 * @title Tree with flat nodes
 */
@Component({
  //selector: 'app-map',
  templateUrl: './role.component.html',
  //styleUrls: ['./map.component.css']
  providers: [ChecklistDatabase]
})
export class RoleComponent implements OnInit {
  @ViewChild('treeMenu', { static: false }) treeMenu;
  ngAfterViewInit() {
    setTimeout(() => {
      this.widthMenu = $('#menuHead').width();
      this.treeMenu.treeControl.expandAll();
    }, 500);

    // this.treeAction.treeControl.expandAll();
    // this.treePermit.treeControl.expandAll();
    // $('#slimMenu').slimScroll({
    //   height: '550px'
    // });
  }

  ngOnInit(): void {

  }
  widthMenu = 1000;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  /** tree menu */
  treeMenuControl: FlatTreeControl<TodoItemFlatNode>;
  treeMenuFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;


  dataMenuSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  dataPermitSource: { data: Array<any> };
  dataRoleSource: { data: Array<any>, selectRoleId: string, selectMenuId: string };

  /** The selection for checklist */
  checklistMenuSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(
    private _database: ChecklistDatabase,
    private roleService: RoleService,
    private notifierService: NotifierService) {
    this.treeMenuFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);

    this.treeMenuControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);

    this.dataMenuSource = new MatTreeFlatDataSource(this.treeMenuControl, this.treeMenuFlattener);

    this.dataPermitSource = { data: Array<any>() };

    this.dataRoleSource = { data: Array<any>(), selectRoleId: null, selectMenuId: null };

    _database.dataMenuChange.subscribe(data => {
      this.dataMenuSource.data = data;

    });
    _database.dataPermitChange.subscribe(data => {
      console.log(this.dataPermitSource);
      this.dataPermitSource.data = data;

    });
    _database.dataRoleChange.subscribe(data => {
      this.dataRoleSource.data = data;
      if (data.length > 0) {
        this.dataRoleSource.selectRoleId = data[0].id;
        this.selectedRole(data[0].id);
      }
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.id === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.id === node.id
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.id = node.id;
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    flatNode.permits = node.permits;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllMenuSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeMenuControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistMenuSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallyMenuSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeMenuControl.getDescendants(node);
    const result = descendants.some(child => this.checklistMenuSelection.isSelected(child));
    return result && !this.descendantsAllMenuSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemMenuSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistMenuSelection.toggle(node);
    const descendants = this.treeMenuControl.getDescendants(node);
    var isSelected = this.checklistMenuSelection.isSelected(node);
    isSelected
      ? this.checklistMenuSelection.select(...descendants)
      : this.checklistMenuSelection.deselect(...descendants);
    descendants.forEach(node => {
      node.isSelected = isSelected;
    });

    // Force update for the parent
    descendants.every(child =>
      this.checklistMenuSelection.isSelected(child)
    );
    this.checkAllMenuParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemMenuSelectionToggle(node: TodoItemFlatNode, ev): void {
    node.isSelected = ev.checked;
    this.checklistMenuSelection.toggle(node);
    this.checkAllMenuParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */

  checkAllMenuParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getMenuParentNode(node);
    while (parent) {
      this.checkRootNodeMenuSelection(parent);
      parent = this.getMenuParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeMenuSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistMenuSelection.isSelected(node);
    const descendants = this.treeMenuControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistMenuSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistMenuSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistMenuSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getMenuParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeMenuControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeMenuControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  /** UnCheck All */

  unCheckMenuAll() {
    var menus = new List<TodoItemFlatNode>(this.treeMenuControl.dataNodes);
    var nodeSelected = new List<TodoItemFlatNode>(this.checklistMenuSelection.selected)
    var nodes = menus.where(w => nodeSelected.select(s => s.id).any(a => a === w.id)).toArray();
    nodes.forEach(node => {
      //node.actionids = [];
      //node.permitids = [];
      node.permits.forEach(permit => {
        permit.isSelected = false;
      });
      this.checklistMenuSelection.isSelected(node);
      this.todoLeafItemMenuSelectionToggle(node, { checked: false });
    });
  }


  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeMenuControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }

  async onSaveAuth() {
    var role = this.dataRoleSource.selectRoleId;
    var datas = [];
    this.checklistMenuSelection.selected.forEach(menu => {
      (new List<any>(menu.permits)).where(w => w.isSelected === true).toArray().forEach(permit => {
        datas.push({ roleid: role, menuid: menu.id, permitid: permit.id });
      });
    });

    this.roleService.setData(datas).then(rs => {
      this.notifierService.success('Thông báo', 'Cập nhật thành công');
    }, err => {
      this.notifierService.warning('Thông báo', 'Cập nhật thông tin thất bại');
    });

  }

  async selectedRole(id: string) {
    this.dataRoleSource.selectRoleId = id;
    this.unCheckMenuAll();
    debugger;
    var rs = await this.roleService.getMenuByRole(id);
    var menus = new List<TodoItemFlatNode>(this.treeMenuControl.dataNodes);
    var selectedMenus = new List<any>(rs.data);

    var nodes = menus.where(w => selectedMenus.select(s => s.id).any(a => a === w.id)).toArray();
    nodes.forEach(node => {
      node.permits.forEach(permit => {
        var selectedPermits = new List<any>(selectedMenus.single(s => s.id === node.id).permit);
        if (selectedPermits.any(a => a.id === permit.id)) {
          permit.isSelected = true;
        }
        else {
          permit.isSelected = false;
        }
      });

      this.checklistMenuSelection.isSelected(node);
      this.todoLeafItemMenuSelectionToggle(node, { checked: true });
    });
  }
}
