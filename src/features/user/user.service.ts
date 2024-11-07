import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: uuidv4(),
      login: 'john_doe',
      password: 'securePassword123',
      version: 1,
      createdAt: 1617557574000,
      updatedAt: 1617557574000,
    },
    {
      id: uuidv4(),
      login: 'jane_doe',
      password: 'anotherSecurePassword456',
      version: 1,
      createdAt: 1617557575000,
      updatedAt: 1617557575000,
    },
    {
      id: uuidv4(),
      login: 'admin_user',
      password: 'adminPassword789',
      version: 1,
      createdAt: 1617557576000,
      updatedAt: 1617557576000,
    },
  ];

  private omitPassword(user: User): Omit<User, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const user: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);

    return this.omitPassword(user);
  }

  findAll(): User[] {
    return this.users;
  }

  findAllOmit(): Omit<User, 'password'>[] {
    return this.users.map(this.omitPassword);
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findOneOmit(id: string): Omit<User, 'password'> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    return this.omitPassword(user);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findOne(id);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
  }
}