import {
  BadRequestException,
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
    return this.db.getFavoritesResponce();
  }

  findOne(id: number) {
    return `This action returns a #${id} fav`;
  }

  addTrackToFavorites(trackId: string) {
    this.trackService.findOne(trackId);

    return this.db.getFavorites().tracks.push(trackId);
  }

  addAlbumToFavorites(albumId: string) {
    this.albumService.findOne(albumId);

    return this.db.getFavorites().albums.push(albumId);
  }

  addArtistToFavorites(artistid: string) {
    this.artistService.findOne(artistid);

    return this.db.getFavorites().artists.push(artistid);
  }

  deleteTrackFromFavorites(trackId: string) {
    if (!validate(trackId)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }

    this.trackService.findOne(trackId);
    const index = this.db.getFavorites().tracks.indexOf(trackId);

    if (index === -1) {
      throw new NotFoundException(
        `Track with id ${trackId} is not in the favorites.`,
      );
    }
    return this.db.getFavorites().tracks.splice(index, 1);
  }

  update(id: number, updateFavDto: UpdateFavDto) {
    return `This action updates a #${id} fav`;
  }

  remove(id: number) {
    return `This action removes a #${id} fav`;
  }
}
