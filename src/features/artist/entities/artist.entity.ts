import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistData } from '../artistData.model';
import { v4 as uuidv4 } from 'uuid';

export class Artist implements ArtistData {
  constructor(data: Partial<ArtistData>) {
    Object.assign(this, data);
    this.id = data.id ?? uuidv4();
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
