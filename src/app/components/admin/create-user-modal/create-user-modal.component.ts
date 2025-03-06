import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URL } from 'src/app/constants/urls';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css'],
})
export class CreateUserModalComponent implements OnInit {
  createForm!: FormGroup;
  confirmPasswordError;
  confirmPasswordCheck!: boolean;
  isLoading!: boolean;

  constructor(public activeModal: NgbActiveModal, private http: ApiService) {
    this.confirmPasswordCheck = false;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      first_name: new FormControl(null,Validators.compose([Validators.required, Validators.maxLength(16)])),
      last_name: new FormControl(null,Validators.compose([Validators.required, Validators.maxLength(16)])),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(16)])),
      confirm_password: new FormControl(null,Validators.compose([Validators.required, Validators.maxLength(16)])),
    });
  }

  confirmPassowrd() {
    let password = this.createForm.value.password;
    let confirm_password = this.createForm.value.confirm_password;
    if (password !== confirm_password) {
      this.confirmPasswordError =
        'Confirm password doesnot matches with Password';
      this.confirmPasswordCheck = false;
    } else {
      this.confirmPasswordError = '';
      this.confirmPasswordCheck = true;
    }
  }

  onSubmit() {
    this.isLoading = true;

    let userData = {
      first_name: this.createForm.value.first_name,
      last_name: this.createForm.value.last_name,
      email: this.createForm.value.email,
      password: this.createForm.value.password,
      scope: 'user',
      is_active: true,
    };
    this.http.post(URL.USER, userData).subscribe(
      (data) => {
        this.isLoading = false;
        this.activeModal.close('success');
      },
      (error) => {
        this.isLoading = false;
        this.activeModal.close('error');
      }
    );
  }
}
