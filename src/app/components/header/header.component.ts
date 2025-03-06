import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   routeUrl!:string;
   is_admin:boolean;
  constructor(private router:Router) { }

  ngOnInit(): void {
    let is_admin=localStorage.getItem("scope")
    if(is_admin==="superuser"){
      this.is_admin=true;
    }else{
      this.is_admin=false;
    }
  }

  toContacts(){
    this.router.navigate(['client/contact'])
  }

  toMessage(){
    this.router.navigate(['client/message'])
  }

  toProfile(){
    // this.router.navigate([''])
  }

  toHome(){
    this.router.navigate([''])
  }

  toPreview(){
    this.router.navigate(['client/preview'])
  }

  // toCampaign(){
  //   this.router.navigate(['client/'])

  // }

  Logout(){
    localStorage.removeItem('userInfo')
    this.router.navigate(['login'])
  }

}
