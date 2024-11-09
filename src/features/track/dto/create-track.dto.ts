import { IsString, IsUUID, IsOptional, IsInt } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsInt()
  duration: number;

  @IsUUID()
  @IsOptional()
  artistId?: string;

  @IsUUID()
  @IsOptional()
  albumId?: string;
}
