import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IColumnDef } from 'src/app/interfaces/IColumnDef.interface';
import { ApiService } from 'src/app/services/api.service';
import { URL } from 'src/app/constants/urls';
import { ModalComponent } from '../../modal/modal.component';
import { LoadDataModalComponent } from '../load-data-modal/load-data-modal.component';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnDestroy {
  userData!: any;

  errorMessage!: string;

  errorStatus!: boolean;

  isLoading: boolean;

  agGridHeight: number;

  columnDefs: IColumnDef[];

  @Input() rowData: any[];

  overlayNoRowsTemplate: string;

  rowSelection!: string;

  paginationPageSize: number;

  selectedContacts: any[];

  subscription: Subscription;

  @Output() sendContacts = new EventEmitter();

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private http: ApiService,
    private sharedService: SharedService
  ) {
    this.isLoading = false;
    this.paginationPageSize = 20;
    this.rowData = [];
    this.agGridHeight = 50;
    this.rowSelection = 'rowSelection';
    this.selectedContacts = [];
    this.columnDefs = [
      {
        headerName: 'Student ID',
        field: 'student_id',
        width: 180,
        checkboxSelection: true,
        headerCheckboxSelection:true,
        headerCheckboxSelectionFilteredOnly:true
      },
      {
        headerName: 'First Name',
        field: 'first_name',
        width: 180,
      },
      {
        headerName: 'Last Name',
        field: 'last_name',
        width: 180,
      },
      {
        headerName: 'Mobile Ph',
        field: 'day_phone_number',
        width: 180,
      },
      {
        headerName: 'Home Ph',
        field: 'evening_phone_number',
        width: 180,
      },
      {
        headerName: 'School Email',
        field: 'crc_email',
        width: 180,
      },
      {
        headerName: 'Personal Email',
        field: 'preferred_email',
        width: 180,
      },
      {
        headerName: 'Application Email',
        field: 'application_email',
        width: 180,
      },
      {
        headerName: 'Major',
        field: 'major',
        width: 180,
      },
      {
        headerName: 'CAC',
        field: 'cac',
        width: 180,
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 180,
      },
      {
        headerName: 'Gender',
        field: 'gender',
        width: 180,
      },
      {
        headerName: 'Race Ethnicity',
        field: 'race_ethnicity',
        width: 180,
      },
      {
        headerName: 'New Student',
        field: 'new_student',
        width: 180,
      },
  
      {
        headerName: 'Athlete',
        field: 'athlete',
        width: 180,
      },
      {
        headerName: 'Puente',
        field: 'puente',
        width: 180,
      },
    
      {
        headerName: 'Diop',
        field: 'diop',
        width: 180,
      },
      {
        headerName: 'Reported Disability',
        field: 'reported_disability',
        width: 180,
      },
      {
        headerName: 'Income Level Self Reported',
        field: 'income_level_self_reported',
        width: 180,
      },
      {
        headerName: 'Bog',
        field: 'bog',
        width: 180,
      },
      {
        headerName: 'Cal Works',
        field: 'cal_works',
        width: 180,
      },
      {
        headerName: 'Eops',
        field: 'eops',
        width: 180,
      },
      {
        headerName: 'Care',
        field: 'care',
        width: 180,
      },
      {
        headerName: 'Homeless',
        field: 'homeless',
        width: 180,
      },
      {
        headerName: 'Need Based Federal Aid',
        field: 'need_based_federal_aid',
        width: 180,
      },
      {
        headerName: 'Completed Units',
        field: 'completed_units',
        width: 180,
      },
      {
        headerName: 'GPA',
        field: 'gpa',
        width: 180,
      },
      {
        headerName: 'Units Completed Including District',
        field: 'units_completed_including_district',
        width: 180,
      },
      {
        headerName: 'Enrolled Districtwide',
        field: 'enrolled_districtwide',
        width: 180,
      },
    ];
    this.subscription = new Subscription();
    this.subscription.add(this.sharedService.getUpdatedData$.subscribe(
      (item: { type: string; files?: File }) => {
        if (Object.keys(item).length != 0) {
          item.type === 'csv'
            ? this.getDataFromCSV(item)
            : this.getDataFromDatabase();
        }
      }
    ))
    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getDataFromCSV(item: { type: string; files?: File }) {
    this.isLoading = true;
    this.http.postFile(URL.CSV, item.files, false).subscribe({
      next: (res) => {
        this.rowData = res.body.contacts;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  getDataFromDatabase() {
    this.isLoading = true;
    this.http.get(URL.CONATCTS).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.rowData = res.body.contacts;
        console.log(this.rowData);
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  createModal(title: string, message: string,check:boolean) {
    let modal = this.modalService.open(ModalComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.errorMessage = message;
    modal.componentInstance.check = check;

    return modal;
  }

  getSelectedData(event: any) {
    this.selectedContacts = event;
  }

  toMessage() {
    let selectedEmails=this.selectedContacts.map(emails=>{
      return emails.preferred_email
    })
    // console.log(selectedEmails);
    this.sendContacts.emit(selectedEmails);
  }
}
