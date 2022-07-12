import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"list-users",component:ListUsersComponent},
  {path:"edit-user/:id",component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
