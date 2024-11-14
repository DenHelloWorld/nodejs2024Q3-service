import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DbModule } from '../../core/db/db.module';
@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), DbModule],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {
  constructor() {
    console.log('UserModule initialized');
  }
}
