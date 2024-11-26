import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DbService } from '../../core/db/db.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  @Inject(DbService) private readonly db: DbService;
  @Inject(JwtService) private readonly jwtService: JwtService;
  async signup(createUserDto: CreateUserDto) {
    const userExists = this.db
      .getUsers()
      .find((user) => user.login === createUserDto.login);
    if (userExists) {
      throw new UnauthorizedException('The user with this login exists');
    }
    const saltOrRounds = process.env.CRYPT_SALT;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      +saltOrRounds || 10,
    );

    const user: User = new User({
      login: createUserDto.login,
      password: hashedPassword,
    });

    this.db.getUsers().push(user);

    return { ...user.omitPassword() };
  }

  async login(createUserDto: CreateUserDto) {
    const user = this.db
      .getUsers()
      .find((user) => user.login === createUserDto.login);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user.id, user.login);
    const refreshToken = this.generateRefreshToken(user.id, user.login);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    return {
      id: user.id,
      message: 'Login successful',
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const user = this.db
      .getUsers()
      .find((user) => user.refreshToken === refreshToken);

    if (!user) {
      throw new ForbiddenException('Invalid refresh token');
    }

    this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });

    const newAccessToken = this.generateAccessToken(user.id, user.login);
    const newRefreshToken = this.generateRefreshToken(user.id, user.login);

    user.refreshToken = newRefreshToken;
    user.accessToken = newAccessToken;

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private generateAccessToken(userId: string, login: string): string {
    const payload = { userId, login };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }

  private generateRefreshToken(userId: string, login: string): string {
    const payload = { userId, login };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }
}
