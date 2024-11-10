import {
  BadRequestException,
  Inject,
  // Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { ArtistData } from './artistData.model';
import { DbService } from '../../core/db/db.service';

@Injectable()
export class ArtistService {
  @Inject(DbService) private readonly db: DbService;

  create(createArtistDto: CreateArtistDto): ArtistData {
    const artist: Artist = new Artist({ ...createArtistDto });

    this.db.getArtists().push(artist);

    return artist;
  }

  findAll(): ArtistData[] {
    return this.db.getArtists();
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const artist = this.db.getArtists().find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException("The artist with this id doesn't exist");
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const artist = this.findOne(id);

    Object.assign(artist, { ...updateArtistDto });

    return artist;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid user ID. It must be a valid UUID.',
      );
    }
    const artist = this.findOne(id);

    if (!artist) {
      throw new NotFoundException("The artist with this id doesn't exist");
    } else {
      this.db.removeArtist(id);
    }
  }
}
