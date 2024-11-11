import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';
import { UserData } from '../userData.model';

export class CreateUserDto {
  @ApiProperty({ example: 'user123', description: 'The login of the user' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class CreatedUserDto implements Omit<UserData, 'password'> {
  @ApiProperty({
    example: v4(),
  })
  id: string;

  @ApiProperty({
    example: 'Example',
  })
  login: string;

  @ApiProperty({
    example: 1,
  })
  version: number;

  @ApiProperty({
    example: Date.now(),
  })
  createdAt: number;

  @ApiProperty({
    example: Date.now(),
  })
  updatedAt: number;
}
