import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { UserData } from './userData.model';
import { DbService } from '../../core/db/db.service';

@Injectable()
export class UserService {
  @Inject(DbService) private readonly db: DbService;

  create(createUserDto: CreateUserDto): Omit<UserData, 'password'> {
    const user: User = new User({ ...createUserDto });

    this.db.getUsers().push(user);

    return user.omitPassword();
  }
  private updateVer(user: User): void {
    user.version += 1;
    user.updatedAt = Date.now();
  }

  findAllOmit(): Omit<UserData, 'password'>[] {
    return this.db.getUsers().map((user) => user.omitPassword());
  }

  private findOne(id: string): User {
    const user = this.db.getUsers().find((user) => user.id === id);
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
    const user = this.db.getUsers().find((user) => user.id === id);
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

    const userIndex = this.db.getUsers().findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    } else {
      this.db.removeUser(userIndex);
    }
  }
}
