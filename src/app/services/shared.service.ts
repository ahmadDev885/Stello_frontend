import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser.interface'
import {BehaviorSubject, Observable} from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userData: IUser
  private getData = new BehaviorSubject<object>({});

  // Observable navItem stream
  getUpdatedData$ = this.getData.asObservable();


  // service command

  constructor() { }

  getUser(): IUser {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userData = user
    return user
  }

  updatedData(list) {
    this.getData.next(list);
  }

  setUser(setUser: IUser): IUser {
    const user = {
      user_name: setUser.user_name,
      email: setUser.email,
      full_name: setUser.full_name,
      user_type: setUser.user_type,
      id: setUser.id
    }
    this.userData = setUser
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
    return this.userData
  }



}
@Injectable({
    providedIn: 'root'
})

export class HasRoleGuard implements CanActivate{

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkUserLogin(route,state)
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    let scope=localStorage.getItem('scope')
    if(route.data['role']!==scope){
      this.router.navigate(['login'])
    }
    return true 
  }

}
