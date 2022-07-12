import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users:User[] = []
  userIdToDelete =0
  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (usersList)=>{
        this.users = usersList
      }
    )
  }
  clickOnDelete(userIdToDelete: number){
    this.userIdToDelete = userIdToDelete
  }

  editUser(userIdToEdit:number){
    this.router.navigate(["edit-user",userIdToEdit])
  }
  
  delete(userIdToDelete: number){
    this.userService.deleteUser(userIdToDelete).subscribe(
      (result)=>{
       // console.log(result)
        //this.users = this.users.filter((user)=>{
          //user.userId !== userIdToDelete
        //})
        this.userService.getUsers().subscribe(
          (remainingUsers)=>{
            this.users = remainingUsers
          }
        )
      }
    )
  }

}
