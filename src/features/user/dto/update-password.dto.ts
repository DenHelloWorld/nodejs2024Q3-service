import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'oldPassord1',
    description: 'The old password of the user',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'newPassord1',
    description: 'The new password of the user',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
