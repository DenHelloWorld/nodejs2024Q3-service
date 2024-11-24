import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('album')
@UsePipes(new ValidationPipe())
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.albumService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  // @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(id);
  }
}
