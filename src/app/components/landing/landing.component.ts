import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { URL } from '../../constants/urls';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  landingPageForm!: FormGroup;

  isLoading!: boolean;

  errorMessage!: string;

  constructor(
    private http: ApiService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.landingPageForm = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(16)])),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      phone_number: new FormControl(null, Validators.compose([Validators.required, Validators.max(9999999999), Validators.pattern(/^(0|[1-9]\d*)?$/)])),
      institute: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(16),Validators.pattern('[a-zA-Z ]*')])),
      job_title: new FormControl(null,Validators.compose([Validators.required, Validators.maxLength(16),Validators.pattern('[a-zA-Z ]*')])),
    });
  }

  createModal(title:string,message:string,check:boolean){
    let modal=this.modalService.open(ModalComponent)
    modal.componentInstance.title=title;
    modal.componentInstance.errorMessage=message;
    modal.componentInstance.check=check;
    return modal
  }

  onSubmit() {
    this.isLoading = true;
    this.errorMessage=""
    let temp = this.landingPageForm.getRawValue();
    this.http.post(URL.LANDING, temp).subscribe(
      (data) => {
        this.createModal('Success',"Form has been submitted successfully",true)
        this.landingPageForm.reset()
        this.isLoading=false;
      },
      (error) => {
        this.errorMessage=error.error.detail;
        this.createModal('Error',"Error occured while submitting Form",false)
        this.isLoading=false;
      }
    );
  }

  toSignup() {
    this.router.navigate(['login']);
  }
}
