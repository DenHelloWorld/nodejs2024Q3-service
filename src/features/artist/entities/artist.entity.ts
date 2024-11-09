import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistData } from '../artistData.model';

export class Artist implements ArtistData {
  constructor(data: Partial<ArtistData>) {
    Object.assign(this, data);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
