import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup
  constructor(
    private userService:UserService,
    private fb : FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email : ["",[Validators.required,Validators.email]],
        password : ["",[Validators.required]]
      }
    )

  }
  onSubmit(){
    console.log(this.loginForm)
this.userService.login(this.loginForm.get("email")!.value,this.loginForm.get("password")!.value)
//.subcribe(
  var user= new User()
  user.email="test"
  user.role="Admin"
  const jwt="testing"
this.userService.saveUser(user,jwt)
//)
this.router.navigate(["home"])
  }

}
