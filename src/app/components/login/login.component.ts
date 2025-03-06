import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { URL } from 'src/app/constants/urls';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  isLoading!: boolean;

  errorMessage!: string;
  constructor(private http: ApiService, private router: Router,private modalService: NgbModal) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required,Validators.email])),
      password: new FormControl(null, Validators.required),
    });
  }

  createModal(title:string,message:string,check:boolean){
    let modal=this.modalService.open(ModalComponent)
    modal.componentInstance.title=title;
    modal.componentInstance.errorMessage=message;
    modal.componentInstance.check=check;

    return modal
  }

  onLogin() {
    this.isLoading = true;
    let temp = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.http.postFormData(URL.LOGIN, temp,false,false).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.body.access_token);
        localStorage.setItem('scope', data.body.scope);
        this.errorMessage = '';
        if(data.body.scope==='superuser'){
          this.isLoading = false;
          this.router.navigate(['admin']);
        }else{
          this.isLoading = false;
          this.router.navigate(['client/campaign']);
        }
      },
      (error) => {
   
        this.createModal('Error',"Login Failed.",false)
        this.errorMessage = error.error.detail;
        this.isLoading = false;
      }
    );
  }

  toLandingPage(){
    this.router.navigate([''])
  }

  onFocus() {
    this.errorMessage = '';
  }
}
