import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { TrackData } from '../trackData.model';
@Entity()
export class Track implements TrackData {
  constructor(data?: Partial<TrackData>) {
    if (data) {
      this.artistId =
        data.artistId !== undefined ? data.artistId : this.artistId;
      this.albumId = data.albumId !== undefined ? data.albumId : this.albumId;
      this.duration =
        data.duration !== undefined ? data.duration : this.duration;
      this.name = data.name !== undefined ? data.name : this.name;
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
