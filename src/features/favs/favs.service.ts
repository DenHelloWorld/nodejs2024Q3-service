import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { validate } from 'uuid';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Fav } from './entities/fav.entity';
import { FavoritesResponse } from './favs.model';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(Fav)
    private readonly favRepository: Repository<Fav>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const favs = await this.favRepository.find();

    const artistIds = favs.flatMap((fav) => fav.artists);
    const albumIds = favs.flatMap((fav) => fav.albums);
    const trackIds = favs.flatMap((fav) => fav.tracks);

    const artists = await this.artistRepository.find({
      where: {
        id: In(artistIds),
      },
    });

    const albums = await this.albumRepository.find({
      where: {
        id: In(albumIds),
      },
    });

    const tracks = await this.trackRepository.find({
      where: {
        id: In(trackIds),
      },
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrackToFavorites(trackId: string): Promise<Track> {
    if (!validate(trackId)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not in the libraty.`,
      );
    }

    let fav = await this.favRepository.findOne({ where: {} });

    if (!fav) {
      fav = this.favRepository.create();
    }

    if (!fav.tracks?.some((id) => id === track.id)) {
      fav.tracks?.push(track.id);
    }

    await this.favRepository.save(fav);

    return track;
  }

  async addAlbumToFavorites(albumId: string): Promise<Album> {
    if (!validate(albumId)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is not in the libraty.`,
      );
    }

    let fav = await this.favRepository.findOne({ where: {} });

    if (!fav) {
      fav = this.favRepository.create();
    }

    if (!fav.albums?.some((id) => id === album.id)) {
      fav.albums?.push(album.id);
    }

    await this.favRepository.save(fav);

    return album;
  }

  async addArtistToFavorites(artistId: string): Promise<Artist> {
    if (!validate(artistId)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not in the library.`,
      );
    }

    let fav = await this.favRepository.findOne({ where: {} });

    if (!fav) {
      fav = this.favRepository.create();
    }

    if (!fav.artists?.some((id) => id === artist.id)) {
      fav.artists?.push(artist.id);
    }

    await this.favRepository.save(fav);

    return artist;
  }
  async deleteTrackFromFavorites(trackId: string): Promise<Fav> {
    if (!validate(trackId)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not in the library.`,
      );
    }

    let fav = await this.favRepository.findOne({ where: {} });

    if (!fav) {
      fav = this.favRepository.create();
    }

    const trackIndex = fav.tracks?.findIndex((id) => id === track.id);

    if (trackIndex === -1) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not in the favorites.`,
      );
    }

    fav.tracks?.splice(trackIndex, 1);

    return await this.favRepository.save(fav);
  }

  async deleteAlbumFromFavorites(albumId: string) {
    if (!validate(albumId)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }

    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is not in the library.`,
      );
    }

    let fav = await this.favRepository.findOne({ where: {} });

    if (!fav) {
      fav = this.favRepository.create();
    }

    const albumIndex = fav.albums?.findIndex((id) => id === album.id);

    if (albumIndex === -1) {
      throw new UnprocessableEntityException(
        `AlbumId with id ${albumId} is not in the favorites.`,
      );
    }
    fav.albums?.splice(albumIndex, 1);

    return await this.favRepository.save(fav);
  }

  async deleteArtistFromFavorites(artistId: string) {
    if (!validate(artistId)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }

    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not in the library.`,
      );
    }

    let fav = await this.favRepository.findOne({ where: {} });

    if (!fav) {
      fav = this.favRepository.create();
    }

    const artistindex = fav.artists?.findIndex((id) => id === artist.id);

    if (artistindex === -1) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not in the favorites.`,
      );
    }

    fav.artists?.splice(artistindex, 1);

    return await this.favRepository.save(fav);
  }
}
