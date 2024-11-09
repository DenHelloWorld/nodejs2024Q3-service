import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumData } from '../albumData.model';

export class Album implements AlbumData {
  constructor(data: AlbumData) {
    Object.assign(this, data);
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
