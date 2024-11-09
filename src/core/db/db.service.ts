import { Injectable } from '@nestjs/common';
import { User } from '../../features/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../../features/track/entities/track.entity';
import { Artist } from '../../features/artist/entities/artist.entity';
import { Album } from '../../features/album/entities/album.entity';
@Injectable()
export class DbService {
  private users: User[] = [
    new User({
      login: 'john_doe',
      password: 'securePassword123',
    }),
    new User({
      login: 'admin_user',
      password: 'adminPassword789',
    }),
  ];
  private tracks: Track[] = [
    new Track({
      name: 'First Track',
      duration: 1,
    }),
    new Track({
      name: 'Second Track',
      duration: 1,
    }),
  ];
  private artists: Artist[] = [
    new Artist({
      name: 'First Artist',
      grammy: false,
    }),
    new Artist({
      name: 'Second Artist',
      grammy: true,
    }),
  ];
  private albums: Album[] = [
    new Album({
      id: uuidv4(),
      name: 'First Album',
      year: 1994,
      artistId: null,
    }),
  ];

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

  removeArtist(artistId: string, artistIndex: number): void {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
    this.artists.splice(artistIndex, 1);
    // Добавить удаление артиста из альбомов
  }

  removeUser(userIndex: number): void {
    this.users.splice(userIndex, 1);
  }
}
