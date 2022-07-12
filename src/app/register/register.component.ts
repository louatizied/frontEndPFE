import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   registerForm! : FormGroup

   form={
    username:"",
    email:"",
    cin:0,
    num_tel:0,
    password:""
   }
  constructor(
    private fb : FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
 
   this.registerForm = this.fb.group({
      username:["",[Validators.required]],
      email:["",[Validators.required,Validators.email]],
      cin:["",[Validators.required]],
      num_tel:["",[Validators.required]],
      password:["",[Validators.required]]

    })
  }

  onSubmit(){
    console.log(this.registerForm)
    var user = new User()
    user.username= this.registerForm.get("username")!.value
    user.email= this.form.email
    user.cin= this.form.cin
    user.num_tel= this.form.num_tel
    user.password= this.form.password
    this.userService.createUser(user).subscribe(
      (createUser)=>{
        console.log(createUser)
      }
    )
  }
}
