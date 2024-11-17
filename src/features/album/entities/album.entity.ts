import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { AlbumData } from '../albumData.model';

@Entity()
export class Album implements AlbumData {
  constructor(data: Partial<AlbumData>) {
    if (data) {
      this.name = data.name !== undefined ? data.name : this.name;
      this.year = data.year !== undefined ? data.year : this.year;
      this.artistId =
        data.artistId !== undefined ? data.artistId : this.artistId;
    }
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
