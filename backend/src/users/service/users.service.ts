import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './../dtos/users.dtos';
import { User } from './../entites/users.entity';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error(`Tree with id ${id} not found`);
    }
    return user;
  }

  async create(body: CreateUserDto) {
    const newUser = await this.userModel.insertMany([
      {
        username: 'usuario1',
        email: 'usuario1@example.com',
        avatar: 'https://example.com/avatar1.jpg',
        password: 'password123',
      },
    ]);
    return newUser;
  }

  async update(id: string, body: UpdateUserDto) {
    await this.userModel.updateOne({ _id: new ObjectId(id) }, { $set: body });
    return await this.userModel.findById(id);
  }

  async remove(id: string) {
    const user: User = await this.findOne(id);
    await this.userModel.deleteOne({ _id: new ObjectId(id) });
    return {
      deletedUser: user,
    };
  }
}
