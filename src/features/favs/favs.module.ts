import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DbService } from '../../core/db/db.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    DbService,
    TrackService,
    AlbumService,
    ArtistService,
  ],
})
export class FavsModule {}
