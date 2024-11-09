// export interface ArtistData {
//   id: string; // uuid v4
//   name: string;
//   grammy: boolean;
// }

import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
