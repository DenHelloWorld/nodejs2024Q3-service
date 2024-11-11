import {
  BadRequestException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from '../../core/db/db.service';
import { validate } from 'uuid';

@Injectable()
export class FavsService {
  @Inject(DbService) private readonly db: DbService;

  findAll() {
    return this.db.getFavoritesResponce();
  }

  findOne(id: number) {
    return `This action returns a #${id} fav`;
  }

  addTrackToFavorites(trackId: string) {
    if (!validate(trackId)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const track = this.db.getTracks().find((track) => track.id === trackId);

    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not in the libraty.`,
      );
    }

    return this.db.getFavorites().tracks.push(trackId);
  }

  addAlbumToFavorites(albumId: string) {
    if (!validate(albumId)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const album = this.db.getAlbums().find((album) => album.id === albumId);

    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is not in the libraty.`,
      );
    }

    return this.db.getFavorites().albums.push(albumId);
  }

  addArtistToFavorites(artistid: string) {
    if (!validate(artistid)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const artist = this.db
      .getArtists()
      .find((artist) => artist.id === artistid);

    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistid} is not in the libraty.`,
      );
    }

    return this.db.getFavorites().artists.push(artistid);
  }

  deleteTrackFromFavorites(trackId: string) {
    if (!validate(trackId)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }

    const index = this.db.getFavorites().tracks.indexOf(trackId);

    if (index === -1) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not in the favorites.`,
      );
    }
    return this.db.getFavorites().tracks.splice(index, 1);
  }

  deleteAlbumFromFavorites(albumId: string) {
    if (!validate(albumId)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }

    const index = this.db.getFavorites().albums.indexOf(albumId);

    if (index === -1) {
      throw new UnprocessableEntityException(
        `AlbumId with id ${albumId} is not in the favorites.`,
      );
    }
    return this.db.getFavorites().albums.splice(index, 1);
  }

  deleteArtistFromFavorites(artistId: string) {
    if (!validate(artistId)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }

    const index = this.db.getFavorites().artists.indexOf(artistId);

    if (index === -1) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not in the favorites.`,
      );
    }
    return this.db.getFavorites().artists.splice(index, 1);
  }
}
