import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { UserData } from './userData.model';

@Injectable()
export class UserService {
  private users: User[] = [
    new User({
      id: uuidv4(),
      login: 'john_doe',
      password: 'securePassword123',
    }),
    new User({
      id: uuidv4(),
      login: 'admin_user',
      password: 'adminPassword789',
    }),
  ];

  create(createUser: CreateUserDto): Omit<UserData, 'password'> {
    const user: User = new User({
      id: uuidv4(),
      login: createUser.login,
      password: createUser.password,
    });
    this.users.push(user);

    return user.omitPassword();
  }
  private updateVer(user: User): void {
    user.version += 1;
    user.updatedAt = Date.now();
  }

  findAllOmit(): Omit<UserData, 'password'>[] {
    return this.users.map((user) => user.omitPassword());
  }

  private findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException("The user with this id doesn't exist");
    }

    return user;
  }

  findOneOmit(id: string): Omit<UserData, 'password'> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException("The user with this id doesn't exist");
    }

    return user.omitPassword();
  }

  updatePassword(
    id: string,
    password: UpdatePasswordDto,
  ): Omit<UserData, 'password'> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }

    const user = this.findOne(id);

    if (user.password !== password.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = password.newPassword;
    this.updateVer(user);

    return user.omitPassword();
  }

  remove(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }

    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);
  }
}
