import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports:[IonicModule, CommonModule]
})
export class UsersComponent implements OnInit{

  constructor() { }
  users= signal<User[]>([])
  private userService = inject(UsersService);
  ngOnInit(){
    this.userService.getUsers()
    .subscribe({
      next:(users) =>{
        console.log('Users fetched:', users);
        this.users.set(users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    })
  }
}
