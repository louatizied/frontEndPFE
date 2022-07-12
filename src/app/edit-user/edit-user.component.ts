import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  registerForm! : FormGroup
    userIdToEdit = 0
    userToEdit: User = new User();
    form={
      username:"",
      email:"",
      cin:0,
      num_tel:0,
      password:""
     }

  constructor(
    private fb : FormBuilder,
    private route:ActivatedRoute,
    private router : Router,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        console.log(params)
        this.userIdToEdit = params["id"]
        this.userService.getUserById(this.userIdToEdit).subscribe(
          (userToEdit)=>{
            this.userToEdit = userToEdit
            this.form.email = userToEdit.email
            this.form.cin = userToEdit.cin
            this.form.num_tel=userToEdit.num_tel
            this.form.username = userToEdit.username
            this.form.password = userToEdit.password
          }
        )
      }
    )

    this.registerForm = this.fb.group({
      username:["",[Validators.required]],
      email:["",[Validators.required,Validators.email]],
      cin:["",[Validators.required]],
      num_tel:["",[Validators.required]],
      password:["",[Validators.required]]

    })
  }
  onSubmit(){
    console.log(this.form)
    var user = new User()
    user.username= this.form.username
    user.email= this.form.email
    user.cin= this.form.cin
    user.num_tel= this.form.num_tel
    user.password= this.form.password
    user.userId = this.userIdToEdit
    this.userService.updateUser(user).subscribe(
      (updateUser) =>{
        console.log(updateUser)
        this.router.navigate(["list-users"])
      }
    )
  }

}
