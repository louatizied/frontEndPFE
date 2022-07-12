import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteResponse } from '../Models/deleteRespense.model';
import { LoginRequest } from '../Models/loginRequest.model';
import { LoginRespense } from '../Models/loginRespense.model';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  user = new BehaviorSubject(new User())
  currentUser = this.user.asObservable()
  userValue = new User()

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUser.subscribe(
      (currentUser) => {
        this.userValue = currentUser
      }
    )
  }

  createUser(user: User) :Observable<User>{
    //envoyer requete vers backend
    return this.http.post<User>("/user/create",user)
  }

  login(username: string, password: string): Observable<LoginRespense> {
    //envoyer requete vers backend
    var loginRequest: any = {};
    loginRequest["username"] = username
    loginRequest["password"] = password

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      })
    };
    return this.http.post<any>("/auth/login", loginRequest, httpOptions)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/user/list")
  }
  getUserById(userId:number):Observable<User>{
    return this.http.get<User>("/user/list/"+userId)
  }

  deleteUser(userId: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>("/user/delete/" + userId)
  }
  updateUser(user: User):Observable<User>{
    return this.http.put<User>("/user/update/",user)
  }

  saveUser(user: User, jwt: string) {
    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("jwt", jwt)
    this.user.next(user)
    //sessionStorage.setItem("currentUser",JSON.stringify(user))
    //sessionStorage.setItem("jwt",jwt)
  }

  isAuthenticated() {
    var jwt = localStorage.getItem("jwt")
    if (jwt) {
      return true
    }
    return false
    //return !!localStorage.getItem("jwt")
  }

  getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem("currentUser")!)
  }

  getJwtFromLocalStorage(): string {

    return (localStorage.getItem("jwt")!)
  }

  isAdmin() {
    const user: User = this.getUserFromLocalStorage()
    if (user != null && user.roles != undefined) {
      return user.roles.filter((role) => role.roleName === "admin").length !== 0
    } else {
      return false
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigate([""])
  }
}
