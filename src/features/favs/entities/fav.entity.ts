// export interface FavoritesResponse {
//   artists: Artist[];
//   albums: Album[];
//   tracks: Track[];
// }
// export interface Favorites {
//   artists: string[]; // favorite artists ids
//   albums: string[]; // favorite albums ids
//   tracks: string[]; // favorite tracks ids
// }
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Favorites } from '../favs.model';

@Entity()
export class Fav implements Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column('text', { array: true })
  artists: string[] = [];
  @Column('text', { array: true })
  albums: string[] = [];
  @Column('text', { array: true })
  tracks: string[] = [];
}
