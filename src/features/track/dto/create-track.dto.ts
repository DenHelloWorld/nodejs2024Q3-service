import { IsString, IsUUID, IsOptional, IsInt } from 'class-validator';
import { TrackData } from '../trackData.model';
import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    example: 'Example',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  duration: number;
  @ApiProperty({
    example: v4(),
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;
  @ApiProperty({
    example: v4(),
  })
  @IsUUID()
  @IsOptional()
  albumId?: string | null;
}
export class CreatedTrackDto implements TrackData {
  @ApiProperty({
    example: v4(),
  })
  id: string;

  @ApiProperty({
    example: 'Example',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  duration: number;

  @ApiProperty({
    example: v4(),
  })
  artistId: string;

  @ApiProperty({
    example: v4(),
  })
  albumId: string;
}
