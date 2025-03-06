import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IColumnDef } from 'src/app/interfaces/IColumnDef.interface';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { ApiService } from '../../../services/api.service';
import { URL } from 'src/app/constants/urls';
import { ModalComponent } from '../../modal/modal.component';
import { Utils } from '../../../utils/modal.util';
import { CustomButtonComponent } from '../../ag-grid/custom-button/custom-button.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userData!: any;

  errorMessage!: string;

  errorStatus!: boolean;

  isLoading: boolean;

  agGridHeight: number;

  columnDefs: IColumnDef[];

  rowData: any[];

  paginationPageSize: number;
  constructor(private modalService: NgbModal, private http: ApiService) {
    this.errorMessage = '';
    this.errorStatus = false;
    this.isLoading = true;
    this.paginationPageSize = 20;
    this.rowData = [];
    this.agGridHeight = 50;
    this.columnDefs = [
      {
        headerName: 'id',
        field: 'id',
        width: 90,
        sortable: true,
        filter: true,
      },
      {
        headerName: 'first_name',
        field: 'first_name',
        width: 180,
        sortable: true,
        filter: true,
      },
      {
        headerName: 'last_name',
        field: 'last_name',
        width: 210,
        sortable: true,
        filter: true,
      },
      {
        headerName: 'email',
        field: 'email',
        width: 180,
        sortable: true,
        filter: true,
      },
      {
        headerName: '',
        field: '',
        width: 250,
        sortable: false,
        filter: false,
        cellRenderer: CustomButtonComponent,
        cellRendererParams: {
          onEdit: this.onEdit.bind(this),
          onDelete: this.onDelete.bind(this),
        },
      },
    ];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http
      .get(URL.USER)
      .subscribe({ next: (res) => {
        this.rowData = res.body.users;
          this.isLoading = false;
          this.errorStatus = false;
      }, error: (err) => {
          this.isLoading = false;
          this.errorStatus = true;
          this.errorMessage="Error While Fetching Data";
      } });
  }

  createModal(title: string, message: string,check:boolean) {
    let modal = this.modalService.open(ModalComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.errorMessage = message;
    modal.componentInstance.check = check;
    return modal;
  }

  createUser() {
    let result = this.modalService.open(CreateUserModalComponent);
    result.closed.subscribe({
      next: (res) => {
        if (res == 'success') {
          this.createModal('Success', 'User Added Successfully',true);
          this.getUsers();
        } else {
          this.createModal('Error', 'Error while Adding User',false);
        }
      },
    });
  }

  onEdit(params: any) {
    let result = this.modalService.open(EditUserModalComponent);
    result.componentInstance.userData = params.rowData;
    result.closed.subscribe({
      next: (res) => {
        if (res == 'success') {
          this.createModal('Success', 'User Edited Successfully',true);
          this.getUsers();
        } else {
          this.createModal('Error', 'Error while Editing User',false);
        }
      },
    });
  }

  onDelete(params: any) {
    let result = this.modalService.open(DeleteConfirmationModalComponent);
    result.componentInstance.id = params.rowData.id;
    result.closed.subscribe({
      next: (res) => {
        if (res == 'success') {
          this.createModal('Success', 'User Deleted Successfully',true);
          this.getUsers();
        } else if (res == 'error') {
          this.createModal('Error', 'Error while Deleting User',false);
        }
      },
    });
  }
}
