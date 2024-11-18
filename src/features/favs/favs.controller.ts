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
    return await this.favsService.addTrackToFavorites(trackId);
  }
  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') albumId: string) {
    return await this.favsService.addAlbumToFavorites(albumId);
  }
  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') artistid: string) {
    return await this.favsService.addArtistToFavorites(artistid);
  }
  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(@Param('id') id: string) {
    return await this.favsService.deleteTrackFromFavorites(id);
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavorites(@Param('id') id: string) {
    return await this.favsService.deleteAlbumFromFavorites(id);
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavorites(@Param('id') id: string) {
    return await this.favsService.deleteArtistFromFavorites(id);
  }
}
