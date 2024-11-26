import { IsValidRefreshToken } from './IsValidRefreshToken.validator';

export class RefreshTokenDto {
  @IsValidRefreshToken()
  refreshToken: string;
}
