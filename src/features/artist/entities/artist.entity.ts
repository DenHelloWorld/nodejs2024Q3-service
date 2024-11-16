import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { ArtistData } from '../artistData.model';

@Entity()
export class Artist implements ArtistData {
  constructor(data?: Partial<ArtistData>) {
    if (data) {
      this.name = data.name !== undefined ? data.name : this.name;
      this.grammy = data.grammy !== undefined ? data.grammy : this.grammy;
    }
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean')
  grammy: boolean;
}
