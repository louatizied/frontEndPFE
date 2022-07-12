import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../Models/role.model';
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
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ["", [Validators.required]],
        password: ["", [Validators.required]]
      }
    )

  }
  onSubmit() {
    console.log(this.loginForm)
    this.userService.login(this.loginForm.get("email")!.value, this.loginForm.get("password")!.value)
      .subscribe(
        (response) => {
          var user = new User()
          user.username = response.username
          user.email = response.email
          let rolesTable: Role[] = []
          response.roles.forEach((role) => {
            let newRole = new Role()
            newRole.roleName = role
            rolesTable.push(newRole)
          });
          user.roles = rolesTable
          const jwt = response.jwt
          this.userService.saveUser(user, jwt)


        }
      )
    this.router.navigate(["home"])
  }

}

