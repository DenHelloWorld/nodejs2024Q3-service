import { Artist, Album, Track } from './endpoints.model';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
