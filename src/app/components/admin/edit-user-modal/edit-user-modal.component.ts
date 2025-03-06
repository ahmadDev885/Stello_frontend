import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { URL } from 'src/app/constants/urls';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  @Input() userData;
  isLoading!:boolean;
  editForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private http: ApiService) {
    this.isLoading=false;
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      email: new FormControl({value:this.userData.email,disabled: true}),
      first_name: new FormControl(this.userData.first_name,Validators.compose([Validators.required, Validators.maxLength(16)])),
      last_name: new FormControl(this.userData.last_name, Validators.compose([Validators.required, Validators.maxLength(16)])),
    });  
  }

  onSubmit() {
    this.isLoading=true;
    let userData = {
      email: this.editForm.value.email,
      first_name: this.editForm.value.first_name,
      last_name: this.editForm.value.last_name,

    };

    let url=URL.USER+`${this.userData.id}`

    this.http.put(url, userData).subscribe(
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
