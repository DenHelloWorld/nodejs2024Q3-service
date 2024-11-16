import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Track } from './entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TrackController],
  imports: [TypeOrmModule.forFeature([Track])],
  providers: [TrackService],
  exports: [TypeOrmModule],
})
export class TrackModule {}
