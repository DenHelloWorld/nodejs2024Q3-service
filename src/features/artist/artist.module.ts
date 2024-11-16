import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistService],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
