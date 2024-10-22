import { Module } from '@nestjs/common';
import { UsersController } from './constroller/users.controller';
import { UsersService } from './service/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
