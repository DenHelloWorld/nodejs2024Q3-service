import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') trackId: string) {
    return this.favsService.addTrackToFavorites(trackId);
  }
  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') albumId: string) {
    return this.favsService.addAlbumToFavorites(albumId);
  }
  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') artistid: string) {
    return this.favsService.addArtistToFavorites(artistid);
  }
  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favsService.findOne(+id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteTrackFromFavorites(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteAlbumFromFavorites(id);
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteArtistFromFavorites(id);
  }
}
