import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Album } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  imports: [TypeOrmModule.forFeature([Album]), TrackModule],
  providers: [AlbumService],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
