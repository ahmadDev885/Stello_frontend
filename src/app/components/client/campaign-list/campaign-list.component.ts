import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IColumnDef } from 'src/app/interfaces/IColumnDef.interface';
import { ApiService } from 'src/app/services/api.service';
import { URL } from 'src/app/constants/urls';
import { ModalComponent } from '../../modal/modal.component';
import { CreateUserModalComponent } from '../../admin/create-user-modal/create-user-modal.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

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
        headerName: 'Date',
        field: 'created_at',
        width: 180,
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection:true,
        headerCheckboxSelectionFilteredOnly:true
      },
      {
        headerName: 'Email/SMS',
        field: 'status',
        width: 180,
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Message',
        field: 'message',
        width: 500,
        sortable: true,
        filter: true,
        cellRenderer: (params)=> {
          return params.data.message;
        }
      },
      // {
      //   headerName: 'Filters',
      //   field: 'email',
      //   width: 180,
      //   sortable: true,
      //   filter: true,
      // },
      {
        headerName: 'Audience',
        field: 'audience_number',
        width: 180,
        sortable: true,
        filter: true,
      },
    ];
    this.getUsers();
  }

  ngOnInit(): void {
    
  }

  getUsers() {
    this.isLoading = true;
    this.errorMessage = '';
    this.http
      .get(URL.CAMPAIGN)
      .subscribe({ next: (res) => {
        this.rowData = res.body.campaigns;
        if(this.rowData.length !=0){
          this.rowData.forEach(item=>{
            item.status= "";
            if(item.via_sms && item.via_email){
              item.status ="Email/Sms";
            } else if(item.via_email){
              item.status ="Email";
            }else if(item.via_sms) {
              item.status ="Sms"
            } else {
              item.status= "";
            }
          })
        }

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
    // this.modalService.open(EditUserModalComponent)
    // this.modalService.open(DeleteConfirmationModalComponent)
  }



}
