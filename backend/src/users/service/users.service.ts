import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateUserDto, UpdateUserDto } from './../dtos/users.dtos';
import { User } from './../entites/users.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  private users: User[] = [];
  private counterId = 0;
  constructor(private config: ConfigService) {
    this.generateUser();
  }

  getAll() {
    const apiKey = this.config.get('API_KEY');
    console.log(apiKey);
    return this.users;
  }

  generateUser() {
    for (let i = 0; i < 20; i++) {
      this.counterId += 1;
      const user_fake = {
        id: this.counterId,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
      };
      this.users.push(user_fake);
    }
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
