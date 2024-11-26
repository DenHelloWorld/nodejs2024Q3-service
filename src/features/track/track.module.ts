import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbService } from '../../core/db/db.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [TrackController],
  providers: [TrackService, DbService],
})
export class TrackModule {}
