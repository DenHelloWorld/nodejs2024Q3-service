import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DbService } from '../../core/db/db.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { validate } from 'uuid';

@Injectable()
export class FavsService {
  @Inject(DbService) private readonly db: DbService;
  @Inject(TrackService) private readonly trackService: TrackService;
  @Inject(AlbumService) private readonly albumService: AlbumService;
  @Inject(ArtistService) private readonly artistService: ArtistService;
  create(createFavDto: CreateFavDto) {
    return 'This action adds a new fav';
  }

  findAll() {
    return this.db.getFavorites();
  }

  findOne(id: number) {
    return `This action returns a #${id} fav`;
  }

  async addTrackToFavorites(trackId: string) {
    this.trackService.findOne(trackId);

    return this.db.addTrackToFavorites(trackId);
  }

  update(id: number, updateFavDto: UpdateFavDto) {
    return `This action updates a #${id} fav`;
  }

  remove(id: number) {
    return `This action removes a #${id} fav`;
  }
}
