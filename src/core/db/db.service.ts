import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../features/user/entities/user.entity';
import { Track } from '../../features/track/entities/track.entity';
import { Artist } from '../../features/artist/entities/artist.entity';
import { Album } from '../../features/album/entities/album.entity';
import { Favorites, FavoritesResponse } from '../../features/favs/favs.model';
import { data } from '../../../db-data/data';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  getFavoritesResponce(): FavoritesResponse {
    const favorites = {
      artists: this.getArtists().filter((artist) =>
        data.favorites.artists.includes(artist.id),
      ),
      albums: this.getAlbums().filter((album) =>
        data.favorites.albums.includes(album.id),
      ),
      tracks: this.getTracks().filter((track) =>
        data.favorites.tracks.includes(track.id),
      ),
    };
    return favorites;
  }
  getFavorites(): Favorites {
    return data.favorites;
  }
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find(); // Извлекаем всех пользователей из базы данных
  }

  getTracks(): Track[] {
    return data.tracks;
  }

  getArtists(): Artist[] {
    return data.artists;
  }

  getAlbums(): Album[] {
    return data.albums;
  }

  async removeAlbum(albumId: string) {
    for (const track of data.tracks) {
      if (track.albumId === albumId) {
        await this.updateTrack(track);
      }
    }

    await this.updateAlbumList(albumId);
  }

  async updateTrack(track: Track) {
    track.albumId = null;
  }

  async updateAlbumList(albumId: string) {
    data.albums = data.albums.filter((album) => album.id !== albumId);
  }

  removeArtist(artistId: string): void {
    this.getTracks().forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });

    this.getAlbums().forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
    data.artists = data.artists.filter((artist) => artist.id !== artistId);
  }

  async removeUser(userToRemove: User): Promise<void> {
    await this.userRepository.remove(userToRemove);
  }

  removeTrack(trackIndex: number): void {
    data.tracks.splice(trackIndex, 1);
  }
}
