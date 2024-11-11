import { Injectable } from '@nestjs/common';
import { User } from '../../features/user/entities/user.entity';
// import { v4 as uuidv4 } from 'uuid';
import { Track } from '../../features/track/entities/track.entity';
import { Artist } from '../../features/artist/entities/artist.entity';
import { Album } from '../../features/album/entities/album.entity';

const data = {
  users: [] as User[],
  tracks: [] as Track[],
  artists: [] as Artist[],
  albums: [] as Album[],
};

@Injectable()
export class DbService {
  getUsers(): User[] {
    return data.users;
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

  removeUser(userIndex: number): void {
    data.users.splice(userIndex, 1);
  }

  removeTrack(trackIndex: number): void {
    data.tracks.splice(trackIndex, 1);
  }
}
