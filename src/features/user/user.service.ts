import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { validate } from 'uuid';
import { UserData } from './userData.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserData, 'password'>> {
    const user = new User(createUserDto);
    await this.userRepository.save(user);
    return user.omitPassword();
  }

  async findAllOmit(): Promise<Omit<UserData, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.omitPassword());
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');
      user.createdAt = +user.createdAt;
      return user;
    } catch (error) {
      console.error('findOne Error:', error);
      throw error;
    }
  }

  async findOneOmit(id: string): Promise<Omit<UserData, 'password'>> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("The user with this id doesn't exist");
    }

    return user.omitPassword();
  }

  async updatePassword(
    id: string,
    password: UpdatePasswordDto,
  ): Promise<Omit<UserData, 'password'>> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }

    const user = await this.findOne(id);

    if (user.password !== password.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = password.newPassword;
    user.updateVersion();
    user.showVersion();
    await this.userRepository.update(id, {
      password: user.password,
      version: user.version,
      updatedAt: user.updatedAt,
    });

    return user.omitPassword();
  }

  async remove(id: string): Promise<void> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }

    const userToRemove = await this.findOne(id);

    if (!userToRemove) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.remove(userToRemove);
  }
}
