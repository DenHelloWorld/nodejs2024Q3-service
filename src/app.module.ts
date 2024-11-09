import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { TrackModule } from './features/track/track.module';
import { ArtistModule } from './features/artist/artist.module';
import { AlbumModule } from './features/album/album.module';
import { FavsModule } from './features/favs/favs.module';
import { DbService } from './core/db/db.service';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavsModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
