import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  user = new BehaviorSubject(new User())
  currentUser = this.user.asObservable()
  userValue= new User()

  constructor(
    private router:Router
  ) {
    this.currentUser.subscribe(
      (currentUser)=>{
        this.userValue = currentUser
      }
    )
   }
  createUser(user:User){
      //envoyer requete vers backend
  }
  login (username:string,password:string){
  //envoyer requete vers backend
  }
  saveUser(user:User,jwt:string){
    localStorage.setItem("currentUser",JSON.stringify(user))
    localStorage.setItem("jwt",jwt)
    this.user.next(user)
    //sessionStorage.setItem("currentUser",JSON.stringify(user))
    //sessionStorage.setItem("jwt",jwt)
  }
  isAuthenticated(){
    var jwt = localStorage.getItem("jwt")
    if (jwt){
      return true
    }
    return false
  }
  getUserFromLocalStorage(){
    return JSON.parse(localStorage.getItem("currentUser")!)
  }
  isAdmin(){
    const user:User = this.getUserFromLocalStorage()
    return "Admin" === user.role
  }
  logout(){
    localStorage.clear()
    this.router.navigate([""])
  }
}
