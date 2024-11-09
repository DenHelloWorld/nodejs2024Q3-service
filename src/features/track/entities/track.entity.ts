import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { TrackData } from '../trackData.model';
import { v4 as uuidv4 } from 'uuid';

export class Track implements TrackData {
  constructor(data: Partial<TrackData>) {
    Object.assign(this, data);
    this.id = data.id ?? uuidv4();
    this.artistId = data.artistId ?? null;
    this.albumId = data.albumId ?? null;
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
