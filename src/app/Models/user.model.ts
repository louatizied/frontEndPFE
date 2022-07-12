import { Role } from './role.model';
export class User {
    
    userId: number = 0;
    username: string = "";
    cin: number = 0;
    num_tel: number = 0;
    email: string = "";
    password: string = "";
    roles: Role[] = [];
}
