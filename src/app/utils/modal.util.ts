import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class Utils {
    constructor(private modalService: NgbModal){};

    public createModal(title:string,message:string){
        let modal=this.modalService.open(ModalComponent)
        modal.componentInstance.title=title;
        modal.componentInstance.errorMessage=message;
        return modal;
    }
}
