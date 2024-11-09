import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { TrackData } from '../trackData.model';

export class Track implements TrackData {
  constructor(data: Partial<TrackData>) {
    Object.assign(this, data);
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
