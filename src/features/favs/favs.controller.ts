import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  async addTrackToFavorites(@Param('id') trackId: string) {
    return this.favsService.addTrackToFavorites(trackId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') albumId: string) {
    return this.favsService.addAlbumToFavorites(albumId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') artistid: string) {
    return this.favsService.addArtistToFavorites(artistid);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.favsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteTrackFromFavorites(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteAlbumFromFavorites(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteArtistFromFavorites(id);
  }
}
