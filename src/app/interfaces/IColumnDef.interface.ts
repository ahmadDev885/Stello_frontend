export interface IColumnDef {
  headerName: string;
  field: string;
  cellRenderer?: any;
  cellRendererParams?: any;
  width: number;
  sortable?:boolean;
  filter?:boolean;
  headerComponentParams?: any;
  pinned?: string;
  lockPinned?: boolean;
  cellClass?: string;
  valueFormatter?: any;
  tooltipField?: string;
  headerTooltip?: string;
  tooltipShowDelay?: number;
  sort?: string;
  onCellClicked?:any;
  checkboxSelection?:boolean;
  headerCheckboxSelection?:boolean;
  headerCheckboxSelectionFilteredOnly?:boolean
}
