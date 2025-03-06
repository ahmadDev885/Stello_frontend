import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {
  CanComponentDeactivate,
  CanDeactivateGuard,
} from 'src/app/guards/canDeactivateGuard';
import { LoadDataModalComponent } from '../load-data-modal/load-data-modal.component';
import { SharedService } from '../../../services/shared.service';
import { ICreateMessage } from '../../../interfaces/ICreateMessage.interface';
import { IBroadcaseMessage } from 'src/app/interfaces/IBroadcaseMessage.interface';
import { ApiService } from 'src/app/services/api.service';
import { URL } from 'src/app/constants/urls';
import { ModalComponent } from '../../modal/modal.component';
@Component({
  selector: 'app-client-parent',
  templateUrl: './client-parent.component.html',
  styleUrls: ['./client-parent.component.css'],
})
export class ClientParentComponent
  implements OnInit, CanComponentDeactivate, OnDestroy
{
  selectedContacts: any[];

  stageOne: boolean;

  stageTwo: boolean;

  stageThree: boolean;

  rowData: any[];

  messageDetails: IBroadcaseMessage;

  broadcastMessageBody: IBroadcaseMessage;

  modalOptions: NgbModalOptions = {};

  flag: boolean

  constructor(
    private modalService: NgbModal,
    private sharedService: SharedService,
    private http: ApiService,
    private router:Router
  ) {
    this.selectedContacts = [];
    this.stageOne = true;
    this.stageTwo = true;
    this.stageThree = true;
    this.flag = false
  }
  ngOnDestroy(): void {
    if(!this.flag){
      this.modalService.dismissAll()
    }
  }

  ngOnInit(): void {
    this.dataLoadOption();
  }

  dataLoadOption() {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    let result = this.modalService.open(
      LoadDataModalComponent,
      this.modalOptions
    );
    result.closed.subscribe({
      next: (res) => {
        if (res !== 'error') {
          this.stageOne = false;
          this.sharedService.updatedData(res);
        } else {
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSelectedContacts(event: any) {
    this.selectedContacts = event;
    this.stageOne = true;
    this.stageTwo = false;
  }

  backToContacts(event: any) {
    this.stageTwo = event;
    this.stageOne = false;
  }

  getMessageBody(event: any) {
    this.messageDetails = {
      emails: this.selectedContacts,
      subject:event.subject,
      is_sms:event.is_sms,
      is_email:event.is_email,
      message:event.data
    };
    this.stageOne = true;
    this.stageTwo = true;
    this.stageThree = false;
  }

  backToMessage(event: any) {
    this.stageTwo = false;
    this.stageThree = true;
  }

  createModal(title: string, message: string,check:boolean) {
    let modal = this.modalService.open(ModalComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.errorMessage = message;
    modal.componentInstance.check = check;

    return modal;
  }

  broadcastMessage(event: any) {
    this.broadcastMessageBody = {
      message: event.message,
      is_email: event.is_email,
      is_sms: event.is_sms,
      emails: this.selectedContacts,
      subject: event.subject,
    };
    this.http.post(URL.BROADCAST, this.broadcastMessageBody).subscribe(
      (res) => {
        this.createModal('Success', 'Campaign Added Successfully',true);
        this.flag = true
        this.router.navigate(['client/campaign'])
      },
      (error) => {
        this.createModal('Error', 'Error While Adding Campaign',false);
      }
    );
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.selectedContacts.length != 0) {
      return confirm('Do you want to discard changes?');
    } else {
      return true;
    }
  }
}
