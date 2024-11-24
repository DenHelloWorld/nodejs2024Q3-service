import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbService } from '../../core/db/db.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [ArtistController],
  providers: [ArtistService, DbService],
})
export class ArtistModule {}
