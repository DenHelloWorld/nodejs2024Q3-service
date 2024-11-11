import { Album } from '../src/features/album/entities/album.entity';
import { Artist } from '../src/features/artist/entities/artist.entity';
import { Favorites } from '../src/features/favs/favs.model';
import { Track } from '../src/features/track/entities/track.entity';
import { User } from '../src/features/user/entities/user.entity';

export const data = {
  users: [] as User[],
  tracks: [
    new Track({
      name: 'TrackOne',
      duration: 1,
    }),
  ] as Track[],
  artists: [] as Artist[],
  albums: [] as Album[],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  } as Favorites,
};
