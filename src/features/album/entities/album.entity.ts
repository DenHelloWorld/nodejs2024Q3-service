import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumData } from '../albumData.model';
import { v4 as uuidv4 } from 'uuid';

export class Album implements AlbumData {
  constructor(data: Partial<AlbumData>) {
    Object.assign(this, data);
    this.id = data.id ?? uuidv4();
    this.artistId = data.artistId ?? null;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;
}
