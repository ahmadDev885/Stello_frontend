import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { URL } from 'src/app/constants/urls';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent implements OnInit {
@Input() id;
isLoading!:boolean;
  constructor(public activeModal: NgbActiveModal,private http: ApiService) {
    this.isLoading=false;

   }

  ngOnInit(): void {
  }

  onCancel(){
    this.activeModal.close()
  }

  onDelete(){
    let url=URL.USER+`${this.id}`
    this.isLoading=true;

    this.http.delete(url).subscribe(
      (data) => {
        this.isLoading=false;
        this.activeModal.close('success');
      },
      (error) => {
        this.isLoading=false;
        this.activeModal.close('error');
      }
    );
  }

}
