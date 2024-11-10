import { Injectable } from '@nestjs/common';
import { User } from '../../features/user/entities/user.entity';
// import { v4 as uuidv4 } from 'uuid';
import { Track } from '../../features/track/entities/track.entity';
import { Artist } from '../../features/artist/entities/artist.entity';
import { Album } from '../../features/album/entities/album.entity';
@Injectable()
export class DbService {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  getArtists(): Artist[] {
    return this.artists;
  }

  getAlbums(): Album[] {
    return this.albums;
  }

  async removeAlbum(albumId: string) {
    for (const track of this.tracks) {
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
    this.albums = this.albums.filter((album) => album.id !== albumId);
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
    this.artists = this.artists.filter((artist) => artist.id !== artistId);
  }

  removeUser(userIndex: number): void {
    this.users.splice(userIndex, 1);
  }

  removeTrack(trackIndex: number): void {
    this.tracks.splice(trackIndex, 1);
  }
}
