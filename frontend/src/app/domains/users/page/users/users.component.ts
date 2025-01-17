import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { RouterLinkWithHref } from '@angular/router';
import { SessionService } from 'src/app/domains/shared/services/session.service';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports:[IonicModule, CommonModule, RouterLinkWithHref]
})
export class UsersComponent implements OnInit{

  constructor(private sessionService: SessionService) {}

  users= signal<User[]>([])
  private userService = inject(UsersService);
  ngOnInit(){
    this.sessionService.checkSession();
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
