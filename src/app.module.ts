import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { ArtistModule } from './features/artist/artist.module';
import { TrackModule } from './features/track/track.module';
import { AlbumModule } from './features/album/album.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),

    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
  ],
})
export class AppModule {}
