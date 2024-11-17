import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([Artist]), AlbumModule, TrackModule],
  providers: [ArtistService],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
