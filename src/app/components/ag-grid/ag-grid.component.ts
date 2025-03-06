import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { AgGridService } from 'src/app/services/ag-grid.services';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  @Input() listData;

  @Input() paginationPageSize;

  @Input() header;

  @Input() hgt;

  @Output() selecteRows = new EventEmitter();

  @Output() getAllData = new EventEmitter();

  subscription: Subscription;

  frameworkComponents;

  api;

  rowSelection: any;

  columnDefs;

  rowData;

  defaultColDef!: object;

  sideBar: object;

  gridApi;

  gridColumnApi;

  @Input() overlayNoRowsTemplate: string;

  gridOptions;

  rowHeight!: number;

  constructor(private router: Router, private agGridService: AgGridService) {
    this.subscription = new Subscription();
    this.overlayNoRowsTemplate = '<span>No data to display</span>';

    this.rowData = [];

    this.gridOptions = {
    };

    this.frameworkComponents = {
    };
    this.sideBar = {

    };
    this.rowSelection = 'multiple';
    this.subscription.add(this.agGridService.updateRows$.subscribe((val) => this.refreshRows(val)));
  }

  detectMob(): boolean {
    return ((window.innerWidth <= 800));
  }

  ngOnInit(): void {
    this.overlayNoRowsTemplate = '<div>No Data to Display</div>';
    this.defaultColDef = {
      filter: true,
      sortable: true,
      resizable: false,
      floatingFilter: false,
      unSortIcon: true,
      headerComponentParams: { title: 'test' },
      menuTabs: [],
    };

    this.columnDefs = this.header;
    this.rowData = this.listData;
    this.rowHeight = 50;
  }

  //  this function will be called when row selection is changed
  onSelectionChanged(): void {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selecteRows.emit(selectedRows);
  }

  // handler for exporting data as excel
  onBtnExport(): void {
    this.gridApi.exportDataAsExcel();
  }

  //   this function will be called when grid will be rendered
  onGridReady(params:any): void {
    const array: string[] = [];
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.forEachNode((node:any) => array.push(node.data));
      // this.gridApi.sizeColumnsToFit();
    this.getAllData.emit(array);
  }

  // handler for refreshing the row data
  refreshRows(data:any): void {
    this.agGrid.api.setRowData(data);
  }

  onFilterOpened(e: any) {
    // this.gridApi.deselectAll()
  }
  onFilterModified(e: any) {
        this.gridApi.deselectAll()   
  }
  // life cycle hook called when component is destroyed
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
