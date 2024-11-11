import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
    return this.favsService.update(+id, updateFavDto);
  }

  @Delete('track/:id')
  remove(@Param('id') id: string) {
    return this.favsService.deleteTrackFromFavorites(id);
  }
}
