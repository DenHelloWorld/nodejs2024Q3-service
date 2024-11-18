import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Fav } from './entities/fav.entity';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavsController],
  imports: [
    TypeOrmModule.forFeature([Fav]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
  providers: [FavsService],
  exports: [TypeOrmModule],
})
export class FavsModule {}
