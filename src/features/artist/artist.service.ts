import {
  BadRequestException,
  // Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { ArtistData } from './artistData.model';
// import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  // @Inject(TrackService) private readonly trackService: TrackService;

  private artists: Artist[] = [
    new Artist({
      id: uuidv4(),
      name: 'First Artist',
      grammy: false,
    }),
    new Artist({
      id: uuidv4(),
      name: 'Second Artist',
      grammy: true,
    }),
  ];
  create(createArtistDto: CreateArtistDto): ArtistData {
    const artist: Artist = new Artist({
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    this.artists.push(artist);
    return artist;
  }

  findAll(): ArtistData[] {
    return this.artists;
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }
    const artist = this.artists.find((artist) => artist.id === id);
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

    const index = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.artists.splice(index, 1);

    // this.trackService.removeArtistFromTracks(id);
  }
}
