import { Album } from '../../features/album/entities/album.entity';
import { Artist } from '../../features/artist/entities/artist.entity';
import { Favorites } from '../../features/favs/favs.model';
import { Track } from '../../features/track/entities/track.entity';
import { User } from '../../features/user/entities/user.entity';

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
